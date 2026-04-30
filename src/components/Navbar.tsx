import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const navLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Discover',
    path: '/opportunities'
  },
  {
    name: 'Support',
    path: '/support'
  }];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isLanding ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/50' : 'bg-white border-b border-stone-200'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">
                  O
                </span>
              </div>
              <span className="font-bold text-xl text-stone-900 tracking-tight">
                OppLink
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-brand-600' : 'text-stone-600 hover:text-stone-900'}`}>
              
                {link.name}
              </Link>
            )}

            <div className="flex items-center space-x-4 pl-4 border-l border-stone-200">
              <button
                className="text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Search">
                
                <Search className="w-5 h-5" />
              </button>
              <button
                className="text-stone-500 hover:text-stone-900 transition-colors relative"
                aria-label="Notifications">
                
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-accent-500 rounded-full"></span>
              </button>
              <Link
                to="/dashboard"
                className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors">
                
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-900 p-2"
              aria-label="Toggle menu">
              
              {isOpen ?
              <X className="w-6 h-6" /> :

              <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-white border-b border-stone-200 overflow-hidden">
          
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-brand-50 text-brand-600' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}>
              
                  {link.name}
                </Link>
            )}
              <div className="pt-4 mt-4 border-t border-stone-200 flex items-center space-x-4 px-3">
                <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-stone-600 font-medium">
                
                  <User className="w-5 h-5" />
                  Profile
                </Link>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}