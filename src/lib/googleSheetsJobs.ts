/**
 * Loads job rows from Google Sheets via the Sheets API v4 (read-only).
 *
 * Setup:
 * 1. Create a spreadsheet with a header row (see REQUIRED_COLUMNS below).
 * 2. Google Cloud Console → enable "Google Sheets API" → create an API key.
 * 3. Restrict the API key (HTTP referrers for your domain + Sheets API only).
 * 4. Share the sheet "Anyone with the link can view" OR ensure the service account
 *    has access if you use a server-side fetch later.
 *
 * Env:
 *   VITE_GOOGLE_SHEETS_SPREADSHEET_ID  — from the sheet URL
 *   VITE_GOOGLE_SHEETS_API_KEY
 *   VITE_GOOGLE_SHEETS_RANGE — optional, default "Jobs!A:J" (tab name + columns)
 */

import type { Category, Opportunity } from '../data/mock';

const CATEGORIES: Category[] = [
  'Jobs',
  'Training',
  'Transportation',
  'Coaching',
  'Community Resources',
];

const REQUIRED_HEADERS = [
  'id',
  'title',
  'organization',
  'category',
  'location',
  'type',
  'supportlevel',
  'description',
  'tags',
  'postedat',
] as const;

function normalizeCategory(value: string): Category {
  const t = value.trim();
  const found = CATEGORIES.find((c) => c.toLowerCase() === t.toLowerCase());
  return found ?? 'Jobs';
}

function normalizeType(value: string): Opportunity['type'] {
  const x = value.trim().toLowerCase();
  if (x.includes('remote') && !x.includes('hybrid')) return 'Remote';
  if (x.includes('hybrid')) return 'Hybrid';
  return 'In-Person';
}

function normalizeSupport(value: string): Opportunity['supportLevel'] {
  const x = value.trim().toLowerCase();
  if (x.includes('high')) return 'High Support';
  if (x.includes('moderate')) return 'Moderate Support';
  return 'Independent';
}

function headerIndexMap(headerRow: string[]): Map<string, number> {
  const map = new Map<string, number>();
  headerRow.forEach((cell, i) => {
    const key = cell.trim().toLowerCase().replace(/\s+/g, '');
    map.set(key, i);
  });
  return map;
}

function getCell(
  row: string[],
  map: Map<string, number>,
  key: (typeof REQUIRED_HEADERS)[number]
): string {
  const idx = map.get(key);
  if (idx === undefined || idx >= row.length) return '';
  return String(row[idx] ?? '').trim();
}

function parseTags(raw: string): string[] {
  return raw
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseRows(values: string[][]): Opportunity[] {
  if (values.length < 2) return [];

  const map = headerIndexMap(values[0]);
  for (const h of REQUIRED_HEADERS) {
    if (!map.has(h)) {
      console.warn(
        `[googleSheetsJobs] Missing column "${h}". Found headers:`,
        values[0]
      );
      return [];
    }
  }

  const out: Opportunity[] = [];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    if (!row || row.every((c) => !String(c).trim())) continue;

    const title = getCell(row, map, 'title');
    if (!title) continue;

    const idRaw = getCell(row, map, 'id');
    const id = idRaw || `sheet-row-${r}`;

    out.push({
      id,
      title,
      organization: getCell(row, map, 'organization') || '—',
      category: normalizeCategory(getCell(row, map, 'category')),
      location: getCell(row, map, 'location') || '—',
      type: normalizeType(getCell(row, map, 'type')),
      supportLevel: normalizeSupport(getCell(row, map, 'supportlevel')),
      description: getCell(row, map, 'description') || '',
      tags: parseTags(getCell(row, map, 'tags')),
      postedAt: getCell(row, map, 'postedat') || '—',
    });
  }

  return out;
}

export async function fetchJobsFromGoogleSheets(): Promise<Opportunity[] | null> {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const range =
    import.meta.env.VITE_GOOGLE_SHEETS_RANGE?.trim() || 'Jobs!A:J';

  if (!spreadsheetId || !apiKey) {
    return null;
  }

  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`
  );
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const errText = await res.text();
    console.error('[googleSheetsJobs]', res.status, errText);
    throw new Error(`Google Sheets request failed (${res.status})`);
  }

  const data = (await res.json()) as { values?: string[][] };
  const values = data.values;
  if (!values?.length) return [];

  return parseRows(values);
}
