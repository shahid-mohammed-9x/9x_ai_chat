import React, { memo, useCallback, useEffect, useState } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import _ from 'lodash';
import { updatePaginationData } from '@/helpers';

const Chat = () => {
  const {
    getChatMessagesAction,
    clearChatsErrorsAction,
    newQuestionAction,
    updateChatStateAction,
    pollingAnswerAction,
  } = chatActions;
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chatMessageObject, messageLoading, error, statusCode } = useSelector(
    (state) => state.chatsState
  );
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const [info, setInfo] = useState({
    loading: false,
    clearInput: false,
    timeOut: null,
    responseLoading: {
      gpt: false,
      gemini: false,
      deepseek: false,
      qrok: false,
    },
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
        let appendData = {
          _id: response?.[1]?.data?._id,
          responses: response?.[1]?.data?.responses,
          question: response?.[1]?.data?.question,
          models: response?.[1]?.data?.models,
          order: response?.[1]?.data?.order,
        };

        // Deep clone the specific chatId object to avoid mutation
        let updatedMessageObject = _.cloneDeep(chatMessageObject);
        let chatDataClone = updatedMessageObject[chatId];
        chatDataClone = updatePaginationData(chatDataClone, appendData);
        updatedMessageObject = { ...updatedMessageObject, [chatId]: chatDataClone };
        dispatch(updateChatStateAction({ chatMessageObject: _.cloneDeep(updatedMessageObject) }));
        pollingHandlerFunction(response?.[1]?.pollingId);
      } else {
        toast.error(response?.[1]?.message || 'something went wrong');
      }

      setInfo((prev) => ({ ...prev, loading: false, clearInput: false }));
    },
    [info?.loading, info?.clearInput, chatId, chatMessageObject[chatId]]
  );

  const pollingHandlerFunction = useCallback((pollingId) => {
    let query = {
      userId: profileDetails?._id,
      messageId: pollingId,
    };

    // api polling function
    const apiPollingFunction = async () => {
      const response = await pollingAnswerAction(query);
      if (response[1] === true) {
        if (response[1]?.data?.isRecievedAllResponses) {
          clearInterval(info?.timeOut);
          setInfo((prev) => ({ ...prev, timeOut: null }));
        }
      }
    };

    let timeOut = setTimeout(() => {
      apiPollingFunction();
    }, 1000);

    setInfo((prev) => ({ ...prev, timeOut }));
  }, []);

  return (
    <ChatLayout>
      {messageLoading ? null : (
        <>
          <ChatWindow info={info} />
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
