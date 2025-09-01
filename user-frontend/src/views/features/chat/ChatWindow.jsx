import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/helpers';
import AIResponses from './AIResponses';
import { useDispatch, useSelector } from 'react-redux';

const messages = [
  {
    _id: 'msgId1',
    chat: 'chatId',
    question: 'who are you?',
    responses: [
      { model: 'gpt', answer: 'I’m Chat gpt!' },
      { model: 'gemini', answer: 'I’m Gemini!' },
      { model: 'claude', answer: 'I’m Claude!' },
      { model: 'gork', answer: 'I’m Gork!' },
      { model: 'sonar', answer: 'I’m Sonar!' },
      { model: 'deepseek', answer: 'I’m Deep Seek!' },
    ],
    order: 1,
  },
  {
    _id: 'msgId2',
    chat: 'chatId',
    question: 'Tell me about Orange',
    responses: [
      { model: 'gpt', answer: 'A citris fruit' },
      { model: 'gemini', answer: 'It is a color' },
      { model: 'claude', answer: 'It is the 6th color in rainbow' },
      { model: 'gork', answer: 'A color and a fruit' },
      { model: 'sonar', answer: 'A citris fruit which is sore' },
      { model: 'deepseek', answer: 'A color which is lovely' },
    ],
    order: 1,
  },
];

const ChatWindow = () => {
  const [input, setInput] = useState('');
  const { chatMessages, messageLoading } = useSelector((state) => state.chatsState);
  const { profileDetails } = useSelector((state) => state.userProfileState);

  return (
    <div className="w-full flex flex-col h-[700px] rounded-2xl shadow-lg">
      {/* Chat Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        <AIResponses {...chatMessages} profileDetails={profileDetails} />
      </CardContent>

      {/* Input Area */}
    </div>
  );
};

export default memo(ChatWindow);
