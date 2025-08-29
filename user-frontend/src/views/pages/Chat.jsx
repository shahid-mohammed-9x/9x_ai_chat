import React, { memo, useCallback, useEffect } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Chat = () => {
  const { getChatMessagesAction, clearChatsErrorsAction } = chatActions;
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chatMessages, messageLoading, error, statusCode } = useSelector(
    (state) => state.chatsState
  );

  useEffect(() => {
    if (chatId && (!chatMessages || !chatMessages?.chatDetails?._id !== chatId)) {
      fetchChatMessageFunction();
    }
  }, [chatId]);

  useEffect(() => {
    if (error && statusCode === 404) {
      redirectToHomeFunction();
    }
  }, [error, statusCode]);

  const fetchChatMessageFunction = useCallback(() => {
    dispatch(getChatMessagesAction(chatId));
  }, [chatId]);

  const redirectToHomeFunction = useCallback(() => {
    toast.error(error);
    navigate('/');
    dispatch(clearChatsErrorsAction());
  }, [error, statusCode]);
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
