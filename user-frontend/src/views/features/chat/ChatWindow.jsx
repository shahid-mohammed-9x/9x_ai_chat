import { memo, useMemo, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import AIResponses from './AIResponses';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const ChatWindow = () => {
  const { chatId } = useParams();
  const { chatMessageObject } = useSelector((state) => state.chatsState);
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const chatMessages = useMemo(() => {
    let data = _.has(chatMessageObject, chatId) ? _.cloneDeep(chatMessageObject?.[chatId]) : null;
    data?.docs?.reverse();
    return data;
  }, [chatMessageObject?.[chatId], chatId]);

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
