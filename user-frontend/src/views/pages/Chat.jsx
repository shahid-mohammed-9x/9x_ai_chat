import React, { memo, useCallback, useEffect, useState } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Chat = () => {
  const { getChatMessagesAction, clearChatsErrorsAction, newQuestionAction } = chatActions;
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chatMessageObject, messageLoading, error, statusCode } = useSelector(
    (state) => state.chatsState
  );
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const [info, setInfo] = useState({
    loading: false,
    clearInput: true,
    timeOut: null,
  });

  useEffect(() => {
    if (chatId && !chatMessageObject?.[chatId] && !chatMessageObject?.[chatId]?.currentPage !== 1) {
      profileDetails ? fetchChatMessageFunction() : null;
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

  const submitNewQuestionHandlerFunction = useCallback(
    async (e) => {
      if (info?.loading) return;

      const { selectedModels, inputMessage } = e;

      setInfo((prev) => ({ ...prev, loading: true, clearInput: true }));
      const json = {
        question: inputMessage,
        models: selectedModels,
      };
      const response = await newQuestionAction(chatId, json);
      if (response[0] === true) {
        // polling logic will appear here
      } else {
        toast.error(response?.[1]?.message || 'something went wrong');
      }

      setInfo((prev) => ({ ...prev, loading: false, clearInput: false }));
    },
    [info?.loading, info?.clearInput, chatId, chatMessageObject[chatId]]
  );
  return (
    <ChatLayout>
      {messageLoading ? null : (
        <>
          <ChatWindow />
          <ChatFooter
            onClickFunction={submitNewQuestionHandlerFunction}
            loading={info?.loading}
            clearInput={info?.clearInput}
          />
        </>
      )}
    </ChatLayout>
  );
};

export default memo(Chat);
