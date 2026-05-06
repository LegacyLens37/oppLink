import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Opportunity } from '../data/mock';
import { opportunities as mockOpportunities } from '../data/mock';
import { fetchJobsFromGoogleSheets } from '../lib/googleSheetsJobs';

type OpportunitiesContextValue = {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  /** True when live data came from Google Sheets */
  fromGoogleSheets: boolean;
  refresh: () => Promise<void>;
};

const OpportunitiesContext = createContext<OpportunitiesContextValue | null>(
  null
);

export function OpportunitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>(mockOpportunities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromGoogleSheets, setFromGoogleSheets] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sheetJobs = await fetchJobsFromGoogleSheets();
      if (sheetJobs && sheetJobs.length > 0) {
        setOpportunities(sheetJobs);
        setFromGoogleSheets(true);
      } else {
        setOpportunities(mockOpportunities);
        setFromGoogleSheets(false);
      }
    } catch (e: unknown) {
      console.error(e);
      setError(
        e instanceof Error
          ? e.message
          : 'Could not load opportunities from Google Sheets.'
      );
      setOpportunities(mockOpportunities);
      setFromGoogleSheets(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo(
    () => ({
      opportunities,
      loading,
      error,
      fromGoogleSheets,
      refresh: load,
    }),
    [opportunities, loading, error, fromGoogleSheets, load]
  );

  return (
    <OpportunitiesContext.Provider value={value}>
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities(): OpportunitiesContextValue {
  const ctx = useContext(OpportunitiesContext);
  if (!ctx) {
    throw new Error('useOpportunities must be used within OpportunitiesProvider');
  }
  return ctx;
}
