import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

type UnlockOpportunityModalProps = {
  open: boolean;
  onClose: () => void;
};

export function UnlockOpportunityModal({
  open,
  onClose,
}: UnlockOpportunityModalProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-modal-title"
        className="relative z-10 w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white shadow-xl border border-gray-200 border-b-0 sm:border-b p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h2
          id="unlock-modal-title"
          className="text-xl font-bold text-gray-900 pr-10 mb-3">
          Create an account to unlock this opportunity
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
          Sign up or log in to view full details, save opportunities, apply, and
          get personalized support.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/signup"
            onClick={onClose}
            className="btn-primary w-full text-center py-3.5 text-base font-medium">
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={onClose}
            className="btn-secondary w-full text-center py-3.5 text-base font-medium">
            Log In
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-xl transition-colors">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
