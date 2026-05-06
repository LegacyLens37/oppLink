import React from 'react';
import {
  Users,
  MessageSquare,
  Video,
  CalendarCheck,
  ArrowRight } from
'lucide-react';
export function SupportCoaching() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero */}
      <div className="bg-brand-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            You don't have to do it alone
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Connect with an employment specialist or job coach who understands
            your needs and can help you navigate your next steps.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
          {
            icon: MessageSquare,
            title: 'Resume Help',
            desc: 'Get assistance highlighting your strengths and skills.'
          },
          {
            icon: Video,
            title: 'Interview Prep',
            desc: 'Practice in a low-pressure environment with constructive feedback.'
          },
          {
            icon: Users,
            title: 'On-the-job Support',
            desc: 'Coaches can help you transition into your new role smoothly.'
          }].
          map((feature, idx) =>
          <div key={idx} className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-10">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mr-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Request Support
                </h2>
                <p className="text-gray-600">
                  Fill out this quick form and a coach will reach out within 48
                  hours.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    placeholder="Jane" />
                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    placeholder="Doe" />
                  
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you need help with?
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none bg-white">
                  <option>Finding opportunities</option>
                  <option>Applying for a specific job</option>
                  <option>Interview preparation</option>
                  <option>General career guidance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred contact method
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contact"
                      className="w-4 h-4 text-brand-600 focus:ring-accent-500 border-gray-300"
                      defaultChecked />
                    
                    <span className="ml-2 text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contact"
                      className="w-4 h-4 text-brand-600 focus:ring-accent-500 border-gray-300" />
                    
                    <span className="ml-2 text-gray-700">Phone Call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contact"
                      className="w-4 h-4 text-brand-600 focus:ring-accent-500 border-gray-300" />
                    
                    <span className="ml-2 text-gray-700">Text Message</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anything else we should know?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none resize-none"
                  placeholder="Tell us a bit about your goals or any specific accommodations you need...">
                </textarea>
              </div>

              <button type="button" className="btn-primary w-full py-4 text-lg">
                Submit Request
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your information is kept private and secure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>);

}