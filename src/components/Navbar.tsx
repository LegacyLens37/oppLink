import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logOut } = useAuth();
  const isLanding = location.pathname === '/';

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Discover', path: '/opportunities' },
    { name: 'Support', path: '/support' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
          isLanding
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/70'
            : 'bg-white border-b border-gray-200 shadow-sm'
        }`}>
        <nav className="page-section" aria-label="Main">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                <span className="text-lg font-bold leading-none">O</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                OppLink
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-1">
              <div className="mr-6 flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}>
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                <button
                  type="button"
                  className="btn-ghost rounded-full p-2.5 min-h-0 text-gray-500"
                  aria-label="Search">
                  <Search className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="btn-ghost relative rounded-full p-2.5 min-h-0 text-gray-500"
                  aria-label="Notifications">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-support-500 ring-2 ring-white" />
                </button>

                {!loading && user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                      title="Dashboard">
                      <User className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        void logOut().then(() => navigate('/'));
                      }}
                      className="btn-ghost ml-1 gap-1.5 px-2 text-gray-600">
                      <LogOut className="h-4 w-4" />
                      <span className="hidden lg:inline">Log out</span>
                    </button>
                  </>
                ) : !loading ? (
                  <>
                    <Link
                      to="/login"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary shrink-0 px-4 py-2 text-sm">
                      Sign up
                    </Link>
                  </>
                ) : null}
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay + panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-[2px] md:hidden"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed left-0 right-0 top-14 z-50 max-h-[min(85vh,calc(100dvh-3.5rem))] overflow-y-auto border-b border-gray-200 bg-white shadow-lg md:hidden">
              <div className="page-section flex flex-col gap-1 py-4 pb-8">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-xl px-4 py-3.5 text-base font-semibold ${
                        active
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}>
                      {link.name}
                    </Link>
                  );
                })}

                <div className="my-3 border-t border-gray-100" />

                {!loading && user ? (
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 hover:bg-gray-50">
                      <User className="h-5 w-5 text-gray-500" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        void logOut().then(() => navigate('/'));
                      }}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left font-medium text-gray-800 hover:bg-gray-50">
                      <LogOut className="h-5 w-5 text-gray-500" />
                      Log out
                    </button>
                  </div>
                ) : !loading ? (
                  <div className="flex flex-col gap-3 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="rounded-xl px-4 py-3.5 text-center text-base font-semibold text-gray-800 hover:bg-gray-50">
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full justify-center py-3.5">
                      Sign up
                    </Link>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
