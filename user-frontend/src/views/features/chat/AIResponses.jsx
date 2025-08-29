import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { memo } from 'react';

import gpt from '@/assets/modelIcons/gptIcon.png';
import claude from '@/assets/modelIcons/claudeIcon.png';
import gemini from '@/assets/modelIcons/geminiIcon.jpg';
import deepseek from '@/assets/modelIcons/deepseekIcon.png';
import gork from '@/assets/modelIcons/gorkIcon.png';
import sonar from '@/assets/modelIcons/sonarIcon.png';

const modelIcons = {
  gpt: gpt,
  claude: claude,
  gemini: gemini,
  deepseek: deepseek,
  grok: gork,
  sonar: sonar,
};

const AIResponses = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-6 p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
      {messages.map((msg) => (
        <div key={msg._id} className="space-y-6">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 max-w-[70%]">
              <div className="bg-primary text-white px-4 py-2 rounded-2xl shadow">
                {msg.question}
              </div>
              <Avatar>
                <AvatarImage src="/icons/user.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* AI Responses */}
          <div className="w-full shadow-2xl rounded-2xl">
            <div className="flex flex-row gap-4 p-4 overflow-x-auto min-h-[600px] no-scrollbar snap-x snap-mandatory">
              {msg.responses.map((res, i) => (
                <div
                  key={i}
                  className="
                    flex items-start gap-2 p-4 bg-card rounded-2xl 
                    snap-start shrink-0
                    w-[85%] sm:w-[45%] lg:w-[30%]
                  "
                >
                  <Avatar>
                    <AvatarImage src={modelIcons[res.model]} />
                    <AvatarFallback>{res?.model[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl shadow max-h-[500px] overflow-y-auto">
                    {res.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(AIResponses);
