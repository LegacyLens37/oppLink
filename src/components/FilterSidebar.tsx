import React from 'react';
import { Filter, X } from 'lucide-react';
interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const filterSections = [
  {
    title: 'Category',
    options: [
    'Jobs',
    'Training',
    'Transportation',
    'Housing Support',
    'Coaching',
    'Community Resources']

  },
  {
    title: 'Support Level',
    options: ['High Support', 'Moderate Support', 'Independent']
  },
  {
    title: 'Format',
    options: ['In-Person', 'Remote', 'Hybrid']
  },
  {
    title: 'Age Group',
    options: ['Under 18', '18-24', '25-35', '35+']
  }];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-stone-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600">
            
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {filterSections.map((section, idx) =>
          <div key={idx}>
              <h3 className="text-sm font-semibold text-stone-900 mb-4">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.options.map((option, optIdx) =>
              <label
                key={optIdx}
                className="flex items-center cursor-pointer group">
                
                    <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                      <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border border-stone-300 rounded bg-white checked:bg-brand-600 checked:border-brand-600 transition-colors cursor-pointer" />
                  
                      <svg
                    className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    
                        <path
                      d="M1 5L4.5 8.5L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                    
                      </svg>
                    </div>
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      {option}
                    </span>
                  </label>
              )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-stone-200 bg-stone-50">
          <button className="w-full btn-primary py-2.5 text-sm">
            Apply Filters
          </button>
          <button className="w-full mt-3 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
            Clear all
          </button>
        </div>
      </div>
    </div>);

}