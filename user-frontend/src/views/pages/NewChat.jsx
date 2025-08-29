import React, { memo } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatLayout from '../layouts/ChatLayout';

const NewChat = () => {
  return (
    <ChatLayout>
      <div className="m-auto w-full">
        <div>
          <ChatFooter />
        </div>
      </div>
    </ChatLayout>
  );
};

export default memo(NewChat);
