import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, XIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { themeActions } from '@/redux/combineAction';

const pricingCards = [
  {
    title: 'Free Plan',
    price: '$0',
    pro: [
      'Limited AI models access',
      'Basic support',
      'Monthly token limit of 50,000',
      'No image generation or audio transcription',
    ],
    cons: [
      'Limited features and AI models',
      'No priority support',
      'No advanced AI models like GPT-5',
    ],
    gradientFrom: 'from-purple-800',
    gradientTo: 'to-pink-300',
    paid: false,
  },
  {
    title: 'Pro Plan',
    planDetails: [
      { plan: 'month', rate: '$400' },
      { plan: 'year', rate: '$4,999' },
    ],
    pro: [
      'All AI models including GPT-5, Gemini 2.5 Pro, and others',
      'Unlimited token usage',
      'Priority support and instant troubleshooting',
      'Access to image generation & audio transcription',
      'Side-by-side model comparison features',
    ],
    cons: [],
    gradientFrom: 'from-yellow-800',
    gradientTo: 'to-yellow-300',
    paid: true,
  },
];
const FeatureCard = memo(
  ({
    title,
    price,
    pro,
    cons,
    gradientFrom,
    gradientTo,
    isYearly,
    setIsYearly,
    paid,
    planDetails,
  }) => {
    const dispatch = useDispatch();
    const { openLoginAction } = themeActions;
    const selectedRate = paid
      ? planDetails?.find((plan) => (isYearly ? plan.plan === 'year' : plan.plan === 'month'))?.rate
      : price;

    return (
      <motion.div
        className="gradient-border w-full md:w-[48%] shadow-2xl shadow-purple-500/10 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-md rounded-2xl mb-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="w-full min-h-[600px] bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70 shadow-2xl backdrop-blur-md rounded-2xl p-10 flex flex-col justify-between">
          <div>
            <h1
              className={`text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo} mb-4`}
            >
              {title}
            </h1>

            <p className="text-5xl text-center font-bold mb-6">{selectedRate}</p>

            {paid && planDetails && (
              <div className="flex justify-center mb-6 ">
                {planDetails.map((planOption) => (
                  <div
                    key={planOption.plan}
                    onClick={() => setIsYearly(planOption.plan === 'year')}
                    className={`w-40 py-3 font-semibold text-xl ${planOption.plan === 'year'? 'rounded-r-lg':'rounded-l-lg'} text-center cursor-pointer transition-all duration-300
                      ${
                        (isYearly && planOption.plan === 'year') ||
                        (!isYearly && planOption.plan === 'month')
                          ? 'bg-primary text-black shadow-md'
                          : 'bg-slate-800 text-white border border-gray-500'
                      }`}
                  >
                    {planOption.rate}/
                    {planOption.plan.charAt(0).toUpperCase() + planOption.plan.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-6 mt-4">
            <ul className="space-y-3">
              {pro?.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-200">
                  <span className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* Cons */}
            {cons?.length > 0 && (
              <ul className="space-y-3">
                {cons?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-red-300">
                    <span className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center">
                      <XIcon className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <motion.button
            className={`h-14 px-8 w-full sm:w-[100%] md:w-[60%] mx-auto 
                      ${paid ? 'bg-primary' : 'bg-secondary-foreground'} text-black 
                      rounded-lg shadow mt-8 text-xl`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openLoginAction('true'))}
          >
            {paid ? 'Get Started Now' : 'Try Now'}
          </motion.button>
        </div>
      </motion.div>
    );
  }
);

const PlanComponent = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative container mx-auto px-4 py-12 md:py-24 lg:px-8 xl:px-16"
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4">
          Choose Your AI Subscription Plan
        </h1>
        <p className="text-xl text-gray-400">
          Get started with one of our tailored plans to meet your AI needs.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-6 flex-wrap">
        {pricingCards.map((plan, index) => (
          <FeatureCard
            key={index}
            title={plan.title}
            price={plan.price}
            pro={plan.pro}
            cons={plan.cons}
            gradientFrom={plan.gradientFrom}
            gradientTo={plan.gradientTo}
            isYearly={isYearly}
            setIsYearly={setIsYearly}
            paid={plan.paid}
            planDetails={plan.planDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(PlanComponent);
