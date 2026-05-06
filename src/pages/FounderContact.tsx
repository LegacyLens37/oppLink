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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    const cleanedFirst = firstName.trim();
    const cleanedLast = lastName.trim();
    const cleanedPhone = phoneNumber.trim();
    const cleanedEmail = email.trim();
    const cleanedMessage = message.trim();
    const phoneDigits = cleanedPhone.replace(/\D/g, '');

    if (!cleanedFirst) next.firstName = 'Please enter your first name.';
    if (!cleanedLast) next.lastName = 'Please enter your last name.';
    if (!cleanedPhone) next.phone = 'Please enter your phone number.';
    else if (phoneDigits.length < 10) {
      next.phone = 'Please enter a valid phone number (at least 10 digits).';
    }
    if (!cleanedEmail) next.email = 'Please enter your email address.';
    else if (!isValidEmail(cleanedEmail)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!cleanedMessage) next.message = 'Please enter a message.';
    else if (cleanedMessage.length > 8000) {
      next.message = 'Message must be 8,000 characters or less.';
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    const cleanedFirst = firstName.trim();
    const cleanedLast = lastName.trim();
    const cleanedPhone = phoneNumber.trim();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedMessage = message.trim();

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'founder_contact_requests'), {
        firstName: cleanedFirst,
        lastName: cleanedLast,
        phone: cleanedPhone,
        email: cleanedEmail,
        message: cleanedMessage,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
      setFieldErrors({});
    } catch (err) {
      console.error(err);
      setError(
        'We could not save your message. Check your connection and try again. If this keeps happening, please email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    'w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow';

  if (success) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] py-12 sm:py-16">
        <div className="page-section">
          <div className="mx-auto max-w-3xl">
            <div className="card p-8 text-center sm:p-10">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-support-100 text-support-700">
                <MessageCircleHeart className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Thanks — your message is in
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-600">
                I received your note and will follow up as soon as I can. If you
                don&apos;t hear back within a few business days, feel free to
                reach out again.
              </p>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Separate from coaching support requests
            </p>
          </div>
        </div>
      </div>
    );
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
            {error && (
              <div
                className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="founder-first-name"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="founder-first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`${inputBase} ${fieldErrors.firstName ? 'border-red-300 focus:ring-red-400' : ''}`}
                    placeholder="Jane"
                    aria-invalid={Boolean(fieldErrors.firstName)}
                    disabled={submitting}
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1.5 text-sm text-red-600">{fieldErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="founder-last-name"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="founder-last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`${inputBase} ${fieldErrors.lastName ? 'border-red-300 focus:ring-red-400' : ''}`}
                    placeholder="Doe"
                    aria-invalid={Boolean(fieldErrors.lastName)}
                    disabled={submitting}
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1.5 text-sm text-red-600">{fieldErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="founder-phone"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="founder-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                    className={`${inputBase} ${fieldErrors.phone ? 'border-red-300 focus:ring-red-400' : ''}`}
                    placeholder="(555) 123-4567"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    disabled={submitting}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1.5 text-sm text-red-600">{fieldErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="founder-email"
                    className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="founder-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputBase} ${fieldErrors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    disabled={submitting}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="founder-message"
                  className="mb-1.5 block text-sm font-medium text-gray-700">
                  How can I help you? <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="founder-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full resize-y rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow ${fieldErrors.message ? 'border-red-300 focus:ring-red-400' : 'border-gray-200'}`}
                  placeholder="Share your question, partnership idea, feedback, or message..."
                  aria-invalid={Boolean(fieldErrors.message)}
                  disabled={submitting}
                />
                {fieldErrors.message && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none">
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
