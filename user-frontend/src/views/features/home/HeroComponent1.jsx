import React from 'react';
import { motion } from 'framer-motion';
import StarryBackground from './StarryBackground';
import { Check } from 'lucide-react'; // Removed Menu since unused
import './Hero.css';

export default function HeroComponent1() {
  return (
    <div className="relative">
      <StarryBackground count={100} />

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          One Platform. Endless Intelligence.
          <br className="hidden sm:block" />
          Redefining the Future with AI.
        </motion.h1>
        {/* Subtext */}

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Every detail is designed to elevate productivity and unlock the true potential of AI.
        </p>

        {/* Feature Card Section */}
        <section className="mt-10 sm:mt-16 mb-12 sm:mb-24 max-w-6xl mx-auto">
          <div className="gradient-border shadow-2xl shadow-purple-500/10">
            <div className="inner-card p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center text-left">
              {/* Left Side */}
              <div>
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 sm:mb-4">
                  Compare All Premium AIs at Once
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                  Free AI models often deliver restricted and inferior answers. With AI Fiesta, you
                  get access to multiple top-tier premium models, all in one place. Compare their
                  responses side-by-side to experience faster, smarter, and more accurate answers.
                </p>

                {/* Features List */}
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    'Save hours of manual comparison',
                    'Customize your AI team instantly',
                    'Never miss the most accurate answer again',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="text-sm sm:text-base md:text-lg">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side (Image) */}
              <div className="relative w-full flex justify-center">
                <img
                  className="w-full max-w-sm sm:max-w-md md:max-w-full h-auto rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiepA0CEDglzeTYtosieQLtbSPs5rndQk4UqgB_36YEjjDmisQ_xp7YY0WqN8q44iP7rRvcSTUdDL8eGsFaQbsS-f4KgaYAp4QBtPbnbMcdlqWeC_uWLkHtvnQgfJO5C6agVAvNBtRWclTlnK9doeRJ8L5ZsO4gUmnANUxaGCGEISoD2d4yo9ADv5LUhS5of0-Ye9P4PuLfufI7Yy92t_dAl6NWHyIWVruLP8drrKHztdHGmSSlLg33rahvRY0v2nM2L93e-uJ4gc"
                  alt="Laptop showing an AI dashboard interface."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
