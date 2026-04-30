import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Building,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  Info } from
'lucide-react';
import { opportunities } from '../data/mock';
export function OpportunityDetail() {
  const { id } = useParams();
  const opportunity = opportunities.find((o) => o.id === id) || opportunities[0];
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Breadcrumb & Back */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/opportunities"
          className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
          
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to search
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="card p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700">
                  {opportunity.category}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-red-50 text-red-500' : 'bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-600'}`}>
                    
                    <Heart
                      className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    
                  </button>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
                {opportunity.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-stone-600 mb-8">
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-stone-400" />
                  <span className="font-medium">
                    {opportunity.organization}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-stone-400" />
                  <span>
                    {opportunity.location} • {opportunity.type}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-stone-400" />
                  <span>Posted {opportunity.postedAt}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-stone-100 text-stone-700">
                  Support Level: {opportunity.supportLevel}
                </span>
                {opportunity.tags.map((tag, idx) =>
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border border-stone-200 text-stone-600">
                  
                    {tag}
                  </span>
                )}
              </div>
            </div>

            {/* Details Sections */}
            <div className="card p-8 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Overview
                </h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {opportunity.description}
                </p>
                <p className="text-stone-600 leading-relaxed text-lg mt-4">
                  We are looking for motivated individuals who want to learn and
                  grow in a supportive environment. Our team is dedicated to
                  providing the accommodations you need to succeed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Support Available
                </h2>
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                  <ul className="space-y-3">
                    {[
                    'Dedicated job coach for the first 90 days',
                    'Flexible scheduling and sensory-friendly breaks',
                    'Clear, visual task instructions',
                    'Accessible workspace and facilities'].
                    map((item, idx) =>
                    <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-800">{item}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  How to Apply
                </h2>
                <div className="space-y-6">
                  {[
                  {
                    step: 1,
                    title: 'Submit Interest',
                    desc: 'Click the apply button to send your basic information.'
                  },
                  {
                    step: 2,
                    title: 'Introductory Call',
                    desc: 'We will schedule a brief, low-pressure call to discuss your goals.'
                  },
                  {
                    step: 3,
                    title: 'Site Visit',
                    desc: 'Come see the workspace and meet the team before making a decision.'
                  }].
                  map((step) =>
                  <div key={step.step} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center">
                          {step.step}
                        </div>
                        {step.step !== 3 &&
                      <div className="w-0.5 h-full bg-stone-100 my-2" />
                      }
                      </div>
                      <div className="pb-6">
                        <h3 className="text-lg font-semibold text-stone-900">
                          {step.title}
                        </h3>
                        <p className="text-stone-600 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="card p-6 sticky top-24">
              <button className="w-full btn-primary py-4 text-lg mb-4 shadow-md">
                Apply Now
              </button>
              <button className="w-full btn-secondary py-3 mb-6">
                Save for Later
              </button>

              <div className="border-t border-stone-200 pt-6">
                <h3 className="font-semibold text-stone-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-brand-600" />
                  Need help applying?
                </h3>
                <p className="text-sm text-stone-600 mb-4">
                  Our support specialists can help you prepare your application
                  and practice for interviews.
                </p>
                <Link
                  to="/support"
                  className="text-brand-600 font-medium text-sm hover:text-brand-700">
                  
                  Connect with a coach →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}