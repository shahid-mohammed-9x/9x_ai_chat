// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { memo } from 'react';

// import gpt from '@/assets/modelIcons/gptIcon.png';
// import claude from '@/assets/modelIcons/claudeIcon.png';
// import gemini from '@/assets/modelIcons/geminiIcon.jpg';
// import deepseek from '@/assets/modelIcons/deepseekIcon.png';
// import gork from '@/assets/modelIcons/gorkIcon.png';
// import sonar from '@/assets/modelIcons/sonarIcon.png';
// import { getInitials } from '@/helpers';

// const modelIcons = {
//   gpt: gpt,
//   claude: claude,
//   gemini: gemini,
//   deepseek: deepseek,
//   grok: gork,
//   sonar: sonar,
// };

// const AIResponses = ({ docs, chatDetails, profileDetails }) => {
//   return (
//     <div className="flex flex-col space-y-6 p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
//       {docs?.map((singleMessage) => (
//         <div key={singleMessage?._id} className="space-y-6">

//           <div className="flex justify-end">
//             <div className="flex items-center gap-2 max-w-[70%]">
//               <div className="bg-primary text-white px-4 py-2 rounded-2xl shadow">
//                 {singleMessage?.question}
//               </div>
//               <Avatar className="h-8 w-8 rounded-lg">
//                 <AvatarImage src={profileDetails?.avatar} alt={profileDetails?.fullName} />
//                 <AvatarFallback className="rounded-lg">
//                   {' '}
//                   {getInitials(profileDetails?.fullName ?? 'U')}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//           </div>

//           <div className="w-full shadow-2xl rounded-2xl">
//             <div className="flex flex-row gap-4 p-4 overflow-x-auto min-h-[600px] no-scrollbar snap-x snap-mandatory">
//               {singleMessage?.models?.map((singleAiModel, i) => {
//                 const answer = singleMessage?.responses?.[singleAiModel]?.answer ?? null;
//                 return (
//                   <div
//                     key={singleMessage?._id + singleAiModel}
//                     className="
//                     flex items-start gap-2 p-4 bg-card rounded-2xl
//                     snap-start shrink-0
//                     w-[85%] sm:w-[45%] lg:w-[30%]
//                   "
//                   >
//                     <Avatar>
//                       <AvatarImage src={modelIcons[singleAiModel]} />
//                     </Avatar>
//                     {answer && (
//                       <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl shadow max-h-[500px] overflow-y-auto">
//                         {answer}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default memo(AIResponses);

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { memo, useEffect, useRef } from 'react';

import gpt from '@/assets/modelIcons/gptIcon.png';
import claude from '@/assets/modelIcons/claudeIcon.png';
import gemini from '@/assets/modelIcons/geminiIcon.jpg';
import deepseek from '@/assets/modelIcons/deepseekIcon.png';
import gork from '@/assets/modelIcons/gorkIcon.png';
import sonar from '@/assets/modelIcons/sonarIcon.png';
import { getInitials } from '@/helpers';

const modelIcons = {
  gpt,
  claude,
  gemini,
  deepseek,
  grok: gork,
  sonar,
};

const AIResponses = ({ docs = [], chatDetails, profileDetails }) => {
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever docs change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [docs]);

  return (
    <div className="flex flex-col space-y-6 p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
      {[...docs].reverse().map((singleMessage) => (
        <div key={singleMessage?._id} className="space-y-6">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 max-w-[70%]">
              <div className="bg-primary text-white px-4 py-2 rounded-2xl shadow">
                {singleMessage?.question}
              </div>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={profileDetails?.avatar} alt={profileDetails?.fullName} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(profileDetails?.fullName ?? 'U')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* AI Responses */}
          <div className="w-full shadow-2xl rounded-2xl">
            <div className="flex flex-row gap-4 p-4 overflow-x-auto min-h-[600px] no-scrollbar snap-x snap-mandatory">
              {singleMessage?.models?.map((singleAiModel) => {
                const answer = singleMessage?.responses?.[singleAiModel]?.answer ?? null;
                return (
                  <div
                    key={singleMessage?._id + singleAiModel}
                    className="flex items-start gap-2 p-4 bg-card rounded-2xl snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%]"
                  >
                    <Avatar>
                      <AvatarImage src={modelIcons[singleAiModel]} />
                    </Avatar>
                    {answer && (
                      <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl shadow max-h-[500px] overflow-y-auto">
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      {/* Dummy div to scroll into view */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default memo(AIResponses);
