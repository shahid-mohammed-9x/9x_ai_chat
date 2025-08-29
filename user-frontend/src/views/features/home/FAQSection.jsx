import FAQItem from './FAQItem';

const faqs = [
  {
    question: 'What is 9x_AI_CHAT and how does it work?',
    answer:
      '9X_AI_CHAT is a unified platform that gives you access to a wide variety of advanced AI models in one place. Instead of managing multiple subscriptions, you get a seamless experience to experiment and build with the best AI technology available. Our platform handles the complexities of API access, so you can focus on creating innovative solutions.',
  },
  {
    question: 'Can I choose which AI models to use?',
    answer:
      "Absolutely! Our platform features a curated selection of leading AI models, and you can easily switch between them based on your specific needs, whether it's for text generation, data analysis, or image creation.",
  },
  {
    question: 'Is there a limit on the number of messages I can send?',
    answer:
      "Our pricing plans are designed to be generous and cater to various usage levels. While we don't offer 'unlimited' messages, our plans come with a substantial number of tokens. You can upgrade if needed.",
  },
  {
    question: 'What happens if I run out of tokens?',
    answer:
      "We'll notify you when you're running low. You can purchase additional token packs or upgrade to a higher-tier plan to continue using the service without interruption.",
  },
  {
    question: 'How is my data protected on 9X_AI_CHAT?',
    answer:
      'All data transmitted is encrypted using industry-standard protocols. We have strict data handling policies to protect your information and ensure confidentiality.',
  },
  {
    question: 'What are the pricing options available?',
    answer:
      '9X_AI_CHAT offers flexible pricing plans, including a free tier, monthly and annual subscriptions. Pricing is transparent and based on token usage.',
  },
  {
    question: 'How can I manage or cancel my subscription?',
    answer:
      'You have full control over your subscription through your account dashboard. Upgrade, downgrade, or cancel anytime. Changes take effect at the end of the current billing cycle.',
  },
  {
    question: 'Can I use 9X_AI_CHAT on my phone?',
    answer:
      'Yes! Our platform is fully responsive and works on desktops, tablets, and smartphones. Access 9X_AI_CHAT on the go.',
  },
];

const FAQSection = () => {
  return (
    <section id="faqs" className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Frequently Asked Questions (FAQs)
      </h1>
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-10 border border-gray-700 space-y-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
