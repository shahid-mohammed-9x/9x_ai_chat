import { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 text-lg font-medium text-white hover:text-gray-300 focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          size={24}
        />
      </button>

      {isOpen && (
        <div className="pt-2 text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default memo(FAQItem);
