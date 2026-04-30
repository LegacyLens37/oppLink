import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { opportunities } from '../data/mock';
import { OpportunityCard } from '../components/OpportunityCard';
import { FilterSidebar } from '../components/FilterSidebar';
export function OpportunityDiscovery() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header Area */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">
            Discover Opportunities
          </h1>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search by keyword, job title, or organization..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow" />
              
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
        {/* Sidebar */}
        <FilterSidebar
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)} />
        

        {/* Overlay for mobile sidebar */}
        {isMobileFilterOpen &&
        <div
          className="fixed inset-0 bg-stone-900/50 z-30 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)} />

        }

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-stone-600 font-medium">
              Showing {opportunities.length} results
            </p>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-stone-500">Sort by:</span>
              <select className="border-none bg-transparent font-medium text-stone-900 focus:ring-0 cursor-pointer">
                <option>Most Relevant</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {opportunities.map((opp) =>
            <OpportunityCard key={opp.id} opportunity={opp} />
            )}
          </div>

          {/* Pagination (Static) */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg border border-stone-200 text-stone-400 hover:bg-stone-50 disabled:opacity-50"
                disabled>
                
                Previous
              </button>
              <button className="w-10 h-10 rounded-lg bg-brand-600 text-white font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-lg hover:bg-stone-100 text-stone-600 font-medium">
                2
              </button>
              <button className="w-10 h-10 rounded-lg hover:bg-stone-100 text-stone-600 font-medium">
                3
              </button>
              <button className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>);

}