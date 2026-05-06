import React from 'react';
import { Link } from 'react-router-dom';
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">
                  O
                </span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                OppLink
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connecting people with diverse abilities to real-world
              opportunities, support, and community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/opportunities"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Training Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/opportunities"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Community Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/support"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Get a Coach
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Accessibility Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Partners</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Post an Opportunity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Become a Coach
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-accent-600 text-sm transition-colors">
                  
                  Partner Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} OppLink. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}