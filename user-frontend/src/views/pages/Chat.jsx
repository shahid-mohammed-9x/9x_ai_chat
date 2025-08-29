import React, { memo } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';

const Chat = () => {
  return (
    <ChatLayout>
      <ChatWindow />
      <ChatFooter />
    </ChatLayout>
  );
};

export default memo(Chat);
