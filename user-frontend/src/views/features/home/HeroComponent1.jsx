import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import StarryBackground from './StarryBackground';
import './Hero.css';

const featuresData = [
  {
    title: 'Access Multiple AI Experts Instantly',
    description:
      'Instead of testing each AI individually, now you can connect with several top AI models at once. Compare outputs side-by-side to get faster, smarter, and more precise results without switching platforms.',
    list: [
      'Quickly evaluate multiple AI responses',
      'Tailor your AI workflow easily',
      'Always find the best solution for your query',
    ],
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiepA0CEDglzeTYtosieQLtbSPs5rndQk4UqgB_36YEjjDmisQ_xp7YY0WqN8q44iP7rRvcSTUdDL8eGsFaQbsS-f4KgaYAp4QBtPbnbMcdlqWeC_uWLkHtvnQgfJO5C6agVAvNBtRWclTlnK9doeRJ8L5ZsO4gUmnANUxaGCGEISoD2d4yo9ADv5LUhS5of0-Ye9P4PuLfufI7Yy92t_dAl6NWHyIWVruLP8drrKHztdHGmSSlLg33rahvRY0v2nM2L93e-uJ4gc',
  },
  {
    title: 'Idea Amplifier – Smarter Outputs',
    description:
      'Skip the guesswork. Type your idea, click Amplify, and get enhanced, insightful AI responses in moments.',
    list: [
      'Transform concepts into clear, actionable prompts',
      'Receive faster, higher-quality AI outputs',
      'No expertise required to craft prompts',
    ],
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-400',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiepA0CEDglzeTYtosieQLtbSPs5rndQk4UqgB_36YEjjDmisQ_xp7YY0WqN8q44iP7rRvcSTUdDL8eGsFaQbsS-f4KgaYAp4QBtPbnbMcdlqWeC_uWLkHtvnQgfJO5C6agVAvNBtRWclTlnK9doeRJ8L5ZsO4gUmnANUxaGCGEISoD2d4yo9ADv5LUhS5of0-Ye9P4PuLfufI7Yy92t_dAl6NWHyIWVruLP8drrKHztdHGmSSlLg33rahvRY0v2nM2L93e-uJ4gc',
  },
  {
    title: 'Content Wizard – AI Made Simple',
    description:
      'Create polished content in seconds. Enter your idea, press Generate, and watch AI craft high-quality articles, social posts, or stories effortlessly.',
    list: [
      'Instantly transform ideas into engaging content',
      'Save hours of writing and editing',
      'Perfect for blogs, social media, and newsletters',
    ],
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-400',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
];

const FeatureCard = memo(({ title, description, list, gradientFrom, gradientTo, image, index }) => (
  <motion.div
    className="gradient-border shadow-2xl shadow-purple-500/10 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-md rounded-2xl mb-10"
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="inner-card p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center text-left">
      {/* Left */}
      <div>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-4 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
        >
          {title}
        </h2>
        <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">{description}</p>
        <ul className="space-y-3 sm:space-y-4">
          {list?.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shrink-0`}
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-sm sm:text-base md:text-lg text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Right */}
      <div className="relative w-full flex justify-center">
        <img
          className="w-full max-w-sm sm:max-w-md md:max-w-full h-auto rounded-lg shadow-lg shadow-purple-500/30"
          src={image}
          alt={title}
        />
      </div>
    </div>
  </motion.div>
));

const HeroComponent1 = () => {
  return (
    <div id="features" className="relative">
      <StarryBackground count={100} />

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

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Every detail is designed to elevate productivity and unlock the true potential of AI.
        </p>

        {/* Feature Cards with staggered animation */}
        <section className="mt-10 sm:mt-16 max-w-6xl mx-auto">
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature?.title || ''} index={index} {...feature} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default memo(HeroComponent1);
