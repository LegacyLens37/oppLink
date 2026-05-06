import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, MessageCircleHeart } from 'lucide-react';
import { db } from '../lib/firebase';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function FounderContact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanedFirst = firstName.trim();
    const cleanedLast = lastName.trim();
    const cleanedPhone = phoneNumber.trim();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedMessage = message.trim();
    const phoneDigits = cleanedPhone.replace(/\D/g, '');

    if (
      !cleanedFirst ||
      !cleanedLast ||
      !cleanedPhone ||
      !cleanedEmail ||
      !cleanedMessage
    ) {
      setError('Please complete all fields before submitting.');
      return;
    }
    if (!isValidEmail(cleanedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'founder_contact_requests'), {
        firstName: cleanedFirst,
        lastName: cleanedLast,
        phoneNumber: cleanedPhone,
        email: cleanedEmail,
        message: cleanedMessage,
        createdAt: serverTimestamp(),
        source: 'meet-the-founder',
      });
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setError(
        'We could not send your message right now. Please try again in a moment.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF2F7] py-12 sm:py-16">
      <div className="page-section">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
              Founder Contact
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect with me
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Have a question, partnership idea, concern, or feedback? Send a
              message and I&apos;ll follow up directly.
            </p>
          </div>

          <div className="card p-6 sm:p-8 md:p-10">
            {success && (
              <div
                className="mb-6 rounded-xl border border-support-200 bg-support-50 px-4 py-3 text-sm text-support-800"
                role="status">
                Thank you for reaching out. Your message has been sent.
              </div>
            )}
            {error && (
              <div
                className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="founder-first-name"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="founder-first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label
                    htmlFor="founder-last-name"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="founder-last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="founder-phone"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="founder-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="founder-email"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="founder-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="founder-message"
                  className="mb-1.5 block text-sm font-medium text-gray-700">
                  How can I help you?
                </label>
                <textarea
                  id="founder-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow"
                  placeholder="Share your question, partnership idea, feedback, or message..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto">
                {submitting ? 'Sending…' : 'Send Message'}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <MessageCircleHeart className="h-4 w-4 text-accent-600" />
              Separate from coaching support requests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
