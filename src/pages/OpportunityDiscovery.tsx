import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { OpportunityCard } from '../components/OpportunityCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { useOpportunities } from '../contexts/OpportunitiesContext';

export function OpportunityDiscovery() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { opportunities, loading, error, fromGoogleSheets, refresh } =
    useOpportunities();
  const [params] = useSearchParams();
  const categoryFilter = params.get('category');

  const visible = useMemo(() => {
    if (!categoryFilter) return opportunities;
    return opportunities.filter((o) => o.category === categoryFilter);
  }, [opportunities, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Opportunities
          </h1>
          {fromGoogleSheets && (
            <p className="text-sm text-support-600 font-medium mb-3">
              Listings synced from Google Sheets
            </p>
          )}
          {error && (
            <div
              className="mb-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-900 text-sm px-4 py-3 flex flex-wrap items-center justify-between gap-2"
              role="alert">
              <span>{error} Showing sample listings instead.</span>
              <button
                type="button"
                onClick={() => void refresh()}
                className="text-sm font-semibold text-accent-600 hover:text-accent-700">
                Retry
              </button>
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by keyword, job title, or organization..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow"
              />
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden btn-secondary px-4 flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <FilterSidebar
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
        />

        {isMobileFilterOpen && (
          <div
            className="fixed inset-0 bg-gray-900/50 z-30 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
        )}

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">
              {categoryFilter
                ? `Showing ${visible.length} in “${categoryFilter}”`
                : `Showing ${visible.length} results`}
            </p>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="border-none bg-transparent font-medium text-gray-900 focus:ring-0 cursor-pointer">
                <option>Most Relevant</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="card h-96 animate-pulse bg-gray-100 border-gray-100"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visible.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}

          {!loading && visible.length === 0 && (
            <p className="text-center text-gray-600 py-16">
              No opportunities match this filter yet.
            </p>
          )}

          {/* Pagination (Static) */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                disabled>
                Previous
              </button>
              <button className="w-10 h-10 rounded-lg bg-brand-600 text-white font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-600 font-medium">
                2
              </button>
              <button className="w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-600 font-medium">
                3
              </button>
              <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
