import React from 'react';
import { CheckCircle2, Circle, Heart, FileText, Award } from 'lucide-react';
export function ProgressTracker() {
  const stats = [
  {
    label: 'Saved',
    value: 12,
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  {
    label: 'Applications',
    value: 3,
    icon: FileText,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    label: 'Goals Met',
    value: 5,
    icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  }];

  const steps = [
  {
    title: 'Complete Profile',
    status: 'completed'
  },
  {
    title: 'Save 3 Opportunities',
    status: 'completed'
  },
  {
    title: 'Connect with a Coach',
    status: 'current'
  },
  {
    title: 'Submit First Application',
    status: 'upcoming'
  }];

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Your Progress
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
                
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>);

        })}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
          Next Steps
        </h3>
        <div className="space-y-3">
          {steps.map((step, idx) =>
          <div key={idx} className="flex items-center">
              {step.status === 'completed' ?
            <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" /> :
            step.status === 'current' ?
            <div className="w-5 h-5 rounded-full border-2 border-brand-500 mr-3 flex-shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-500 rounded-full" />
                </div> :

            <Circle className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
            }
              <span
              className={`text-sm ${step.status === 'completed' ? 'text-gray-500 line-through' : step.status === 'current' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              
                {step.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

}