import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Calendar } from 'lucide-react';
import { categories } from '../data/mock';
import { useOpportunities } from '../contexts/OpportunitiesContext';
import { CategoryCard } from '../components/CategoryCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { ProgressTracker } from '../components/ProgressTracker';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { opportunities, loading } = useOpportunities();
  const recommended = opportunities.slice(0, 2);
  const { user } = useAuth();
  const displayName =
    user?.displayName?.trim() ||
    user?.email?.split('@')[0] ||
    'there';

  return (
    <div className="min-h-screen bg-[#EEF2F7] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your opportunities today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Bar */}
            <div className="card p-2 flex items-center">
              <div className="pl-4 pr-2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search for jobs, training, or resources..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 py-3" />
              
              <Link to="/opportunities" className="btn-primary py-2 px-6 ml-2">
                Search
              </Link>
            </div>

            {/* Recommended Opportunities */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recommended for you
                </h2>
                <Link
                  to="/opportunities"
                  className="text-sm font-medium text-accent-600 hover:text-accent-700 flex items-center">
                  
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {loading &&
                  [0, 1].map((i) => (
                    <div
                      key={i}
                      className="card h-80 animate-pulse bg-gray-100 border-gray-100"
                    />
                  ))}
                {!loading &&
                  recommended.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} featured />
                  ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Explore Categories
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat, idx) =>
                <CategoryCard key={idx} {...cat} />
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <ProgressTracker />

            {/* Upcoming Tasks */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming
                </h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-brand-50 border border-brand-100">
                  <div className="text-xs font-semibold text-brand-600 mb-1">
                    Tomorrow, 10:00 AM
                  </div>
                  <div className="font-medium text-gray-900">
                    Intro Call with Job Coach
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Online via Zoom
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    Next Week, Wed
                  </div>
                  <div className="font-medium text-gray-900">
                    Resume Building Workshop
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Community Center
                  </div>
                </div>
              </div>

              <button type="button" className="w-full mt-4 py-2 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors">
                View Calendar
              </button>
            </div>

            {/* Need Help Card */}
            <div className="card p-6 bg-accent-50 border-accent-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                Feeling stuck?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with a support specialist to help you navigate your
                options.
              </p>
              <Link
                to="/support"
                className="btn-secondary w-full bg-white border-accent-200 text-gray-800 hover:bg-accent-100">
                
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>);

}