import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PricingComponent = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="container mx-auto px-4 py-12 md:py-24 lg:px-8 xl:px-16 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        <motion.div
          className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-100">Individual AI Subscriptions</h2>
          <p className="text-5xl font-bold mb-6">
            $110 <span className="text-xl text-gray-400">(₹10,000)</span>
          </p>
          <div className="space-y-6">
            <ul className="list-none space-y-3 text-lg">
              <li>ChatGPT 5 - $20/mo</li>
              <li>Google Gemini 2.5 Pro - $20/mo</li>
              <li>Perplexity Sonar Pro - $20/mo</li>
              <li>Claude Sonnet 4 - $20/mo</li>
              <li>Grok 4 - $30/mo</li>
            </ul>
            <ul className="list-none space-y-3 text-red-500 text-lg">
              <li>❌ Multiple subscriptions to manage – expensive</li>
              <li>❌ Constant tab switching</li>
              <li>❌ No comparison features</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <div className="text-5xl font-bold text-[#1DBF73] mx-6">VS</div>
        </div>

        {/* 9x Technology Subscription */}
        <motion.div
          className="bg-[#1F2937] rounded-2xl shadow-2xl  shadow-2xl shadow-purple-500/10 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-md rounded-2xl p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <img
              src="https://9xtechnology.com/assets/images/logo.png"
              alt="Company Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex items-center mb-8 space-x-4 relative">
            <Button
              onClick={() => setIsYearly(false)}
              variant={!isYearly ? 'secondary' : 'primary'}
              className="w-40 px-6 py-3 font-semibold text-xl transition-all duration-300"
              disabled={!isYearly}
            >
              ₹999/Month
            </Button>

            <Button
              onClick={() => setIsYearly(true)}
              variant={isYearly ? 'primary' : 'secondary'}
              className="w-40 px-6 py-3 font-semibold text-xl transition-all duration-300"
              disabled={isYearly}
            >
              ₹9,999/Year
            </Button>

            <div
              className={`absolute bottom-0 left-0 h-1 bg-[#2563EB] transition-all duration-300 ${
                isYearly ? 'w-40 left-40' : 'w-40 left-0'
              }`}
            ></div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0F111A] p-6 rounded-lg text-sm mb-6">
              <span className="text-[#1DBF73]">🎁</span> Ultimate Promptbook & Community Access
            </div>

            <ul className="list-none space-y-4 text-lg">
              <li>✅ All Premium AI Models Included</li>
              <li>✅ Side-by-side comparison</li>
              <li>✅ 3 million tokens/month (Premium models count as 4x)</li>
              <li>✅ Instant prompt enhancement</li>
              <li>✅ Image generation & Audio transcription</li>
            </ul>
          </div>

          <motion.button
            className="h-14 px-8 w-full sm:w-[100%] md:w-[60%] flex-shrink-0 m-auto 
              bg-[#FFD700] text-black hover:bg-[#E6C200] 
              rounded-lg shadow mt-6 text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
    </section>
  );
};

export default PricingComponent;
