import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, Users, Star } from 'lucide-react';
import { categories, testimonials } from '../data/mock';
import { CategoryCard } from '../components/CategoryCard';
import { CoachingSupportForm } from '../components/CoachingSupportForm';

/** Hero carousel — inclusive workplace imagery. Alt text describes visible context for accessibility. */
type HeroSlide = {
  url: string;
  alt: string;
  /** Fine-tune focal point when using object-cover (person/table stays visible on crop). */
  objectPosition?: string;
};

// Replace the `url` + `alt` values below with your own photos whenever you’re ready.
const heroImages: HeroSlide[] = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1663076253022-c0211516cfff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Person with Down syndrome assisting a customer at a coffee shop counter in a real workplace setting',
    objectPosition: '48% 44%',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1683140875610-aae95a999ed2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Person using a wheelchair collaborating with coworkers at a modern office meeting table',
    objectPosition: '50% 35%',
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=750&fit=crop&q=85&auto=format',
    alt: 'Retail associates helping customers in a bright, well-lit retail store',
    objectPosition: '50% 46%',
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=750&fit=crop&q=85&auto=format',
    alt: 'Team members collaborating in a corporate meeting room with a presentation on a whiteboard',
    objectPosition: '50% 42%',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1771275698002-0d7f86758537?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Job coach reviewing resume documents with a candidate in a professional office setting',
    objectPosition: '50% 46%',
  },
  {
    url: 'https://images.unsplash.com/photo-1620069105786-c42c8b55b328?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Autistic person using a laptop for focused learning in a real-world setting',
    objectPosition: '50% 40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=750&fit=crop&q=85&auto=format',
    alt: 'Two professionals collaborating on a laptop, representing workplace support and coaching',
    objectPosition: '50% 45%',
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=750&fit=crop&q=85&auto=format',
    alt: 'Team members collaborating around a laptop during a productive workplace session',
    objectPosition: '50% 45%',
  },
];

export function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#EEF2F7]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-[#EEF2F7] to-[#EEF2F7]" />
        <div className="page-section">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center lg:text-left">
              <p className="mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-600 shadow-sm ring-1 ring-gray-200/80">
                Your next step starts here
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Connecting people to{' '}
                <span className="text-accent-600">real opportunities</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-gray-600 lg:mx-0">
                Discover jobs, training, and support in one place—built for
                people with diverse abilities to find their path forward.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="btn-primary justify-center px-8 py-3.5 text-base">
                  Get started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/opportunities"
                  className="btn-secondary justify-center px-8 py-3.5 text-base">
                  Explore opportunities
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-accent-600 underline-offset-2 hover:text-accent-700 hover:underline">
                  Sign in
                </Link>
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-200/80 pt-8 text-center sm:gap-6 lg:text-left">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Support levels
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    Tailored
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Categories
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    5+ areas
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Coaching
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    1:1 help
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] sm:rounded-3xl sm:aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={heroImages[currentImage].url}
                    alt={heroImages[currentImage].alt}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.55 }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      objectPosition:
                        heroImages[currentImage].objectPosition ?? 'center center',
                    }}
                    loading="eager"
                    decoding="async"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImage(idx)}
                      aria-label={`Go to slide ${idx + 1} of ${heroImages.length}`}
                      aria-current={idx === currentImage}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentImage
                          ? 'w-8 bg-white shadow-sm'
                          : 'w-2.5 bg-white/45 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentImage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 text-center text-sm leading-snug text-gray-500 lg:text-left"
                  aria-hidden="true">
                  {heroImages[currentImage].alt}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <CoachingSupportForm />

      {/* How it works */}
      <section className="border-t border-gray-100 bg-white py-16 sm:py-20 lg:py-24">
        <div className="page-section">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
              Simple steps
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How OppLink works
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              A guided flow so you can focus on your goals—not the overwhelm.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: 'Discover',
                step: '01',
                desc: 'Browse curated jobs, training, and resources matched to your support level.',
              },
              {
                icon: Users,
                title: 'Connect',
                step: '02',
                desc: 'Reach out or get matched with a coach to navigate applications and next steps.',
              },
              {
                icon: CheckCircle2,
                title: 'Succeed',
                step: '03',
                desc: 'Track progress, prepare for interviews, and move forward with confidence.',
              },
            ].map((step, idx) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.08 }}
                className="card flex flex-col p-8 text-center md:text-left">
                <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-100/80">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-gray-400">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{step.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-gray-100 bg-[#EEF2F7] py-16 sm:py-20 lg:py-24">
        <div className="page-section">
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                Explore
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Find what you&apos;re looking for
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Opportunities by category—pick what fits you best.
              </p>
            </div>
            <Link
              to="/opportunities"
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700 sm:flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} {...cat} />
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              to="/opportunities"
              className="btn-secondary w-full justify-center">
              View all categories
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-gray-100 bg-white py-16 sm:py-20 lg:py-24">
        <div className="page-section">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
              Community
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Stories from our community
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real experiences from people who found their path with OppLink.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.map((test, idx) => (
              <article
                key={idx}
                className="card flex flex-col p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex text-support-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mb-8 flex-1 text-lg italic leading-relaxed text-gray-700">
                  &ldquo;{test.quote}&rdquo;
                </blockquote>
                <footer>
                  <div className="font-semibold text-gray-900">{test.author}</div>
                  <div className="mt-0.5 text-sm text-gray-500">{test.role}</div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-brand-600 to-brand-700 py-16 text-white sm:py-20 lg:py-24">
        <div className="page-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to find your opportunity?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Create a free account and take the first step toward your goals.
            </p>
            <Link
              to="/signup"
              className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-600 shadow-lg transition-all hover:bg-gray-50 hover:text-brand-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600">
              Create your free account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
