import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { createUserProfile } from '../lib/user';
export function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 4;
  const [selections, setSelections] = useState({
    types: [] as string[],
    support: '',
    location: '',
    interests: [] as string[]
  });
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    createUserProfile({
      name: 'Alex',
      preferences: selections
    });
    navigate('/dashboard');
  };
  const toggleSelection = (field: 'types' | 'interests', value: string) => {
    setSelections((prev) => {
      const current = prev[field];
      const updated = current.includes(value) ?
      current.filter((item) => item !== value) :
      [...current, value];
      return {
        ...prev,
        [field]: updated
      };
    });
  };
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">O</span>
          </div>
          <span className="font-bold text-xl text-stone-900">OppLink</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-medium text-stone-500 hover:text-stone-900">
          
          Exit
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm font-medium text-stone-500 mb-2">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(step / totalSteps * 100)}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-600"
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${step / totalSteps * 100}%`
                }}
                transition={{
                  duration: 0.3
                }} />
              
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-2xl shadow-soft border border-stone-100 p-8 md:p-12 min-h-[400px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 &&
              <motion.div
                key="step1"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="space-y-6">
                
                  <h2 className="text-3xl font-bold text-stone-900">
                    What are you looking for?
                  </h2>
                  <p className="text-stone-600">
                    Select all that apply. This helps us personalize your
                    dashboard.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    {[
                  'Jobs',
                  'Training & Education',
                  'Housing Support',
                  'Transportation',
                  'Coaching',
                  'Community Events'].
                  map((type) =>
                  <button
                    key={type}
                    onClick={() => toggleSelection('types', type)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${selections.types.includes(type) ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-stone-200 hover:border-brand-300 text-stone-700'}`}>
                    
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{type}</span>
                          {selections.types.includes(type) &&
                      <Check className="w-5 h-5 text-brand-600" />
                      }
                        </div>
                      </button>
                  )}
                  </div>
                </motion.div>
              }

              {step === 2 &&
              <motion.div
                key="step2"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="space-y-6">
                
                  <h2 className="text-3xl font-bold text-stone-900">
                    What level of support do you prefer?
                  </h2>
                  <p className="text-stone-600">
                    There's no wrong answer. We want to make sure you feel
                    comfortable.
                  </p>

                  <div className="space-y-4 mt-8">
                    {[
                  {
                    id: 'high',
                    title: 'High Support',
                    desc: 'I would like a job coach or mentor to guide me regularly.'
                  },
                  {
                    id: 'moderate',
                    title: 'Moderate Support',
                    desc: 'I need some initial help, but can work independently over time.'
                  },
                  {
                    id: 'independent',
                    title: 'Independent',
                    desc: 'I prefer to work independently with minimal accommodations.'
                  }].
                  map((level) =>
                  <button
                    key={level.id}
                    onClick={() =>
                    setSelections({
                      ...selections,
                      support: level.id
                    })
                    }
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all ${selections.support === level.id ? 'border-brand-600 bg-brand-50' : 'border-stone-200 hover:border-brand-300'}`}>
                    
                        <div className="flex justify-between items-center mb-1">
                          <span
                        className={`font-semibold text-lg ${selections.support === level.id ? 'text-brand-900' : 'text-stone-900'}`}>
                        
                            {level.title}
                          </span>
                          {selections.support === level.id &&
                      <Check className="w-5 h-5 text-brand-600" />
                      }
                        </div>
                        <p
                      className={`text-sm ${selections.support === level.id ? 'text-brand-700' : 'text-stone-500'}`}>
                      
                          {level.desc}
                        </p>
                      </button>
                  )}
                  </div>
                </motion.div>
              }

              {step === 3 &&
              <motion.div
                key="step3"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="space-y-6">
                
                  <h2 className="text-3xl font-bold text-stone-900">
                    Where are you looking?
                  </h2>
                  <p className="text-stone-600">
                    Let us know your preferred work or activity format.
                  </p>

                  <div className="space-y-4 mt-8">
                    {[
                  'In-Person Only',
                  'Remote / Work from Home',
                  'Hybrid (Mix of both)'].
                  map((loc) =>
                  <button
                    key={loc}
                    onClick={() =>
                    setSelections({
                      ...selections,
                      location: loc
                    })
                    }
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all ${selections.location === loc ? 'border-brand-600 bg-brand-50 text-brand-900 font-medium' : 'border-stone-200 hover:border-brand-300 text-stone-700'}`}>
                    
                        <div className="flex justify-between items-center">
                          <span>{loc}</span>
                          {selections.location === loc &&
                      <Check className="w-5 h-5 text-brand-600" />
                      }
                        </div>
                      </button>
                  )}
                  </div>
                </motion.div>
              }

              {step === 4 &&
              <motion.div
                key="step4"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="space-y-6 text-center py-8">
                
                  <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-brand-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900">
                    You're all set!
                  </h2>
                  <p className="text-stone-600 max-w-md mx-auto">
                    We've customized your dashboard based on your preferences.
                    You can always change these settings later.
                  </p>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              className={`px-6 py-3 font-medium text-stone-600 hover:text-stone-900 flex items-center transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
              {step !== totalSteps && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
      </main>
    </div>);

}