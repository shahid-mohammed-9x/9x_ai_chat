import React, { memo, useCallback, useEffect } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';
import { useParams } from 'react-router-dom';
import { chatActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const { getChatMessagesAction } = chatActions;
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const { chatMessages, messageLoading } = useSelector((state) => state.chatsState);

  useEffect(() => {
    if (!chatMessages || !chatMessages?.chatDetails?._id !== chatId) {
      fetchChatMessageFunction();
    }
  }, [chatId]);

  const fetchChatMessageFunction = useCallback(() => {
    dispatch(getChatMessagesAction(chatId));
  }, [chatId]);
  return (
    <ChatLayout>
      {messageLoading ? null : (
        <>
          <ChatWindow />
          <ChatFooter />
        </>
      )}
    </ChatLayout>
  );
};

export default memo(Chat);
