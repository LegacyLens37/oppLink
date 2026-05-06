/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
  /** Optional: Google Sheets as job source (see src/lib/googleSheetsJobs.ts) */
  readonly VITE_GOOGLE_SHEETS_SPREADSHEET_ID?: string;
  readonly VITE_GOOGLE_SHEETS_API_KEY?: string;
  readonly VITE_GOOGLE_SHEETS_RANGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
