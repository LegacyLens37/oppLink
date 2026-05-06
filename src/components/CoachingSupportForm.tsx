import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';

const HELP_OPTIONS = [
  'Finding a job',
  'Resume help',
  'Interview preparation',
  'Transportation assistance',
  'Independent living skills',
  'Career direction',
  'Other',
] as const;

const AVAILABILITY_OPTIONS = ['Weekdays', 'Evenings', 'Weekends'] as const;

const CONTACT_OPTIONS = [
  'Phone call',
  'Text message',
  'Email',
  'Zoom/Virtual meeting',
] as const;

type HelpOption = (typeof HELP_OPTIONS)[number];

export function CoachingSupportForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityOrZip, setCityOrZip] = useState('');
  const [helpTopics, setHelpTopics] = useState<Partial<Record<HelpOption, boolean>>>(
    {}
  );
  const [otherDetail, setOtherDetail] = useState('');
  const [supportDescription, setSupportDescription] = useState('');
  const [availability, setAvailability] = useState<
    Record<(typeof AVAILABILITY_OPTIONS)[number], boolean>
  >({
    Weekdays: false,
    Evenings: false,
    Weekends: false,
  });
  const [preferredContact, setPreferredContact] = useState<
    (typeof CONTACT_OPTIONS)[number] | ''
  >('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const otherSelected = Boolean(helpTopics.Other);

  function toggleHelp(option: HelpOption) {
    setHelpTopics((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  }

  function toggleAvailability(key: (typeof AVAILABILITY_OPTIONS)[number]) {
    setAvailability((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!cityOrZip.trim()) next.cityOrZip = 'Please enter your city or ZIP code.';

    const selectedHelp = HELP_OPTIONS.filter((o) => helpTopics[o]);
    if (selectedHelp.length === 0) {
      next.helpTopics = 'Please select at least one option.';
    }
    if (helpTopics.Other && !otherDetail.trim()) {
      next.otherDetail = 'Please describe what you mean by “Other.”';
    }

    const availKeys = AVAILABILITY_OPTIONS.filter((a) => availability[a]);
    if (availKeys.length === 0) {
      next.availability = 'Please select at least one availability option.';
    }

    if (!preferredContact) {
      next.preferredContact = 'Please choose a preferred contact method.';
    }

    if (!supportDescription.trim()) {
      next.supportDescription = 'Please tell us a bit about the support you’re looking for.';
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const selectedHelp = HELP_OPTIONS.filter((o) => helpTopics[o]);
      const availabilityList = AVAILABILITY_OPTIONS.filter((a) => availability[a]);

      await addDoc(collection(db, 'coaching_requests'), {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        cityOrZip: cityOrZip.trim(),
        helpTopics: selectedHelp,
        otherTopicDetail:
          helpTopics.Other && otherDetail.trim() ? otherDetail.trim() : null,
        supportDescription: supportDescription.trim(),
        availability: availabilityList,
        preferredContact,
        createdAt: serverTimestamp(),
        source: 'opp-link-landing',
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        'Something went wrong saving your request. Please try again in a moment, or email us directly if the problem continues.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section
        id="coaching-support"
        className="py-20 md:py-28 bg-[#ECFDF5] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-10 text-center border border-support-200/80 bg-white shadow-card">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-support-100 text-support-700 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
              Thank you! I&apos;ll reach out within 24–48 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow bg-white';

  return (
    <section
      id="coaching-support"
      className="relative py-20 md:py-28 bg-[#ECFDF5] scroll-mt-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(34,197,94,0.08),transparent_55%)]" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-support-700 mb-3">
            Ready.Set.Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Personalized Coaching Support
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Ready.Set.Works offers one-on-one support to help with employment,
            job readiness, transportation, independent living skills, and career
            direction.
          </p>
        </div>

        <div className="card p-6 sm:p-8 md:p-10 shadow-card border border-white/80 ring-1 ring-gray-100/80">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {error && (
              <div
                className="rounded-xl bg-red-50 border border-red-100 text-red-800 text-sm px-4 py-3"
                role="alert">
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="coaching-full-name"
                  className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="coaching-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${inputClass} ${fieldErrors.fullName ? 'border-red-300 focus:ring-red-400' : ''}`}
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  aria-describedby={
                    fieldErrors.fullName ? 'err-full-name' : undefined
                  }
                  disabled={submitting}
                />
                {fieldErrors.fullName && (
                  <p id="err-full-name" className="mt-1.5 text-sm text-red-600">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="coaching-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="coaching-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} ${fieldErrors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                  aria-invalid={Boolean(fieldErrors.email)}
                  disabled={submitting}
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="coaching-phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="coaching-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  disabled={submitting}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="coaching-city"
                  className="block text-sm font-medium text-gray-700 mb-1.5">
                  City or ZIP Code <span className="text-red-600">*</span>
                </label>
                <input
                  id="coaching-city"
                  name="cityOrZip"
                  type="text"
                  autoComplete="postal-code"
                  required
                  value={cityOrZip}
                  onChange={(e) => setCityOrZip(e.target.value)}
                  className={`${inputClass} ${fieldErrors.cityOrZip ? 'border-red-300 focus:ring-red-400' : ''}`}
                  aria-invalid={Boolean(fieldErrors.cityOrZip)}
                  disabled={submitting}
                />
                {fieldErrors.cityOrZip && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {fieldErrors.cityOrZip}
                  </p>
                )}
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                What do you need help with?{' '}
                <span className="text-red-600">*</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {HELP_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${helpTopics[option] ? 'border-support-500 bg-support-50/90 shadow-sm' : 'border-gray-200 hover:border-support-200 bg-white'}`}>
                    <input
                      type="checkbox"
                      checked={Boolean(helpTopics[option])}
                      onChange={() => toggleHelp(option)}
                      className="mt-1 rounded border-gray-300 text-support-600 focus:ring-support-500"
                      disabled={submitting}
                    />
                    <span className="text-sm text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.helpTopics && (
                <p className="text-sm text-red-600">{fieldErrors.helpTopics}</p>
              )}
              {otherSelected && (
                <div className="pt-1">
                  <label
                    htmlFor="coaching-other-detail"
                    className="block text-sm font-medium text-gray-700 mb-1.5">
                    Please specify <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="coaching-other-detail"
                    name="otherDetail"
                    type="text"
                    value={otherDetail}
                    onChange={(e) => setOtherDetail(e.target.value)}
                    className={`${inputClass} ${fieldErrors.otherDetail ? 'border-red-300 focus:ring-red-400' : ''}`}
                    placeholder="Tell us more…"
                    disabled={submitting}
                  />
                  {fieldErrors.otherDetail && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {fieldErrors.otherDetail}
                    </p>
                  )}
                </div>
              )}
            </fieldset>

            <div>
              <label
                htmlFor="coaching-description"
                className="block text-sm font-medium text-gray-700 mb-1.5">
                Briefly describe what kind of support you&apos;re looking for{' '}
                <span className="text-red-600">*</span>
              </label>
              <textarea
                id="coaching-description"
                name="supportDescription"
                rows={4}
                required
                value={supportDescription}
                onChange={(e) => setSupportDescription(e.target.value)}
                className={`${inputClass} resize-y min-h-[120px] ${fieldErrors.supportDescription ? 'border-red-300 focus:ring-red-400' : ''}`}
                disabled={submitting}
              />
              {fieldErrors.supportDescription && (
                <p className="mt-1.5 text-sm text-red-600">
                  {fieldErrors.supportDescription}
                </p>
              )}
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                Availability <span className="text-red-600">*</span>
              </legend>
              <p className="text-xs text-gray-500 -mt-1 mb-2">
                Select all that apply.
              </p>
              <div className="flex flex-wrap gap-3">
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${availability[opt] ? 'border-support-500 bg-support-50/90 shadow-sm' : 'border-gray-200 hover:border-support-200'}`}>
                    <input
                      type="checkbox"
                      checked={availability[opt]}
                      onChange={() => toggleAvailability(opt)}
                      className="rounded border-gray-300 text-support-600 focus:ring-support-500"
                      disabled={submitting}
                    />
                    <span className="text-sm text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.availability && (
                <p className="text-sm text-red-600">{fieldErrors.availability}</p>
              )}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                Preferred contact method <span className="text-red-600">*</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {CONTACT_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${preferredContact === opt ? 'border-support-500 bg-support-50/90 shadow-sm' : 'border-gray-200 hover:border-support-200'}`}>
                    <input
                      type="radio"
                      name="preferredContact"
                      value={opt}
                      checked={preferredContact === opt}
                      onChange={() => setPreferredContact(opt)}
                      className="border-gray-300 text-support-600 focus:ring-support-500"
                      disabled={submitting}
                    />
                    <span className="text-sm text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.preferredContact && (
                <p className="text-sm text-red-600">
                  {fieldErrors.preferredContact}
                </p>
              )}
            </fieldset>

            <p className="text-xs text-gray-600 leading-relaxed border-t border-support-100 pt-6">
              Free consultation available. Paid coaching plans may be offered
              after the initial conversation.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-4 text-lg font-semibold shadow-md hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none">
              {submitting ? 'Sending…' : 'Request Coaching Support'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
