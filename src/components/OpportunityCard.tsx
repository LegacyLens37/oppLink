import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building,
  Heart,
  Clock,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Opportunity } from '../data/mock';
import { useAuth } from '../contexts/AuthContext';
import { UnlockOpportunityModal } from './UnlockOpportunityModal';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
}

export function OpportunityCard({
  opportunity,
  featured = false,
}: OpportunityCardProps) {
  const { user, loading } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const showFullCard = Boolean(user) && !loading;
  const cardClass = `flex flex-col h-full ${featured ? 'border-brand-200 shadow-md ring-1 ring-brand-100' : ''}`;

  if (showFullCard) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={`card ${cardClass}`}>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-3">
              {opportunity.category}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsSaved(!isSaved);
              }}
              className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
              aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}>
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {opportunity.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate">{opportunity.organization}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {opportunity.location} • {opportunity.type}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-sm line-clamp-3 mb-6">
            {opportunity.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700">
              {opportunity.supportLevel}
            </span>
            {opportunity.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {opportunity.postedAt}
          </div>
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ y: -4 }}
        onClick={() => setUnlockModalOpen(true)}
        className={`card ${cardClass} text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`}>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {opportunity.category}
            </span>
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500"
              aria-hidden>
              <Lock className="w-4 h-4" />
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 text-left">
            {opportunity.title}
          </h3>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="truncate text-left">{opportunity.location}</span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4 text-left">
            {opportunity.description}
          </p>

          <p className="text-sm font-medium text-brand-700 text-left leading-snug">
            Sign up to view full details and apply
          </p>
        </div>
      </motion.button>

      <UnlockOpportunityModal
        open={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
      />
    </>
  );
}
