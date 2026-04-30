import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, Users, Star } from 'lucide-react';
import { categories, testimonials } from '../data/mock';
import { CategoryCard } from '../components/CategoryCard';
const heroImages = [
{
  url: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&h=500&fit=crop&q=80',
  alt: 'Young woman with Down syndrome smiling while working at a coffee shop counter'
},
{
  url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&q=80',
  alt: 'Wheelchair user collaborating with colleagues at a meeting table'
},
{
  url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop&q=80',
  alt: 'Diverse team collaborating together at a modern office workspace'
},
{
  url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&q=80',
  alt: 'Group of young adults celebrating a success together with excitement'
},
{
  url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=500&fit=crop&q=80',
  alt: 'Professional smiling confidently in a workplace environment'
}];

export function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-brand-50/50 -skew-y-6 transform origin-top-left -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5
              }}>
              
              <span className="inline-block py-1 px-3 rounded-full bg-accent-100 text-accent-600 text-sm font-medium mb-6">
                Your next step starts here
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 tracking-tight leading-tight">
                Connecting people to{' '}
                <span className="text-brand-600">real opportunities</span>
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed">
                OppLink helps you discover jobs, resources, and support in one
                place. Built for people with diverse abilities to find their
                path forward.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/onboarding"
                  className="btn-primary text-lg px-8 py-4">
                  
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/opportunities"
                  className="btn-secondary text-lg px-8 py-4">
                  
                  Explore Opportunities
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rotating Hero Photos */}
      <section className="pb-24 -mt-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-stone-200">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={heroImages[currentImage].url}
                alt={heroImages[currentImage].alt}
                initial={{
                  opacity: 0,
                  scale: 1.05
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98
                }}
                transition={{
                  duration: 0.7
                }}
                className="absolute inset-0 w-full h-full object-cover" />
              
            </AnimatePresence>

            {/* Subtle gradient overlay at bottom for readability */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Image dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, idx) =>
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-white w-7' : 'bg-white/50 hover:bg-white/80'}`} />

              )}
            </div>
          </motion.div>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentImage}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -8
              }}
              transition={{
                duration: 0.4
              }}
              className="text-center text-sm text-stone-500 mt-4 italic">
              
              {heroImages[currentImage].alt}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              How OppLink Works
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              A simple, guided process to help you find what you need without
              the overwhelm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
            {
              icon: Search,
              title: '1. Discover',
              desc: 'Browse curated jobs, training, and resources tailored to your needs and support level.'
            },
            {
              icon: Users,
              title: '2. Connect',
              desc: 'Reach out directly or get matched with a job coach to help you navigate the process.'
            },
            {
              icon: CheckCircle2,
              title: '3. Succeed',
              desc: 'Track your progress, prepare for interviews, and take your next step with confidence.'
            }].
            map((step, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.2
              }}
              className="text-center">
              
                <div className="w-16 h-16 mx-auto bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                Find what you're looking for
              </h2>
              <p className="text-lg text-stone-600">
                Explore opportunities by category.
              </p>
            </div>
            <Link
              to="/opportunities"
              className="hidden md:flex items-center text-brand-600 font-medium hover:text-brand-700">
              
              View all categories <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) =>
            <CategoryCard key={idx} {...cat} />
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/opportunities" className="btn-secondary w-full">
              View all categories
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Community Stories
            </h2>
            <p className="text-lg text-stone-600">
              Hear from people who found their path using OppLink.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) =>
            <div key={idx} className="card p-8 bg-stone-50/50 border-none">
                <div className="flex text-accent-500 mb-6">
                  {[...Array(5)].map((_, i) =>
                <Star key={i} className="w-5 h-5 fill-current" />
                )}
                </div>
                <p className="text-stone-700 text-lg mb-8 italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div>
                  <div className="font-semibold text-stone-900">
                    {test.author}
                  </div>
                  <div className="text-sm text-stone-500">{test.role}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to find your opportunity?
          </h2>
          <p className="text-brand-100 text-xl mb-10">
            Join our community today and take the first step toward your goals.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-brand-600 bg-white hover:bg-stone-50 transition-colors shadow-lg">
            
            Create your free account
          </Link>
        </div>
      </section>
    </div>);

}