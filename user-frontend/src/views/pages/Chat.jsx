import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatWindow from '../features/chat/ChatWindow';
import ChatLayout from '../layouts/ChatLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { chatActions } from '@/redux/combineAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import _ from 'lodash';
import { updatePaginationData } from '@/helpers';
import { ChatSkeleton } from '../wrappers/AuthWrapper';

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

  const { chatMessageObject, messageLoading, error, statusCode, newChatPollingId } = useSelector(
    (state) => state.chatsState
  );
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const intervalRef = useRef(null);
  const [info, setInfo] = useState({
    loading: false,
    clearInput: false,
    responseLoading: {
      chatgpt: false,
      gemini: false,
      deepseek: false,
      qrok: false,
    },
    allModelLoading: false,
  });

  // for new chat polling
  useEffect(() => {
    if (chatMessageObject?.[chatId] && newChatPollingId) {
      setInfo((prev) => ({
        ...prev,
        responseLoading: { ...prev?.responseLoading, ...newChatPollingId?.responseLoading },
        allModelLoading: true,
      }));
      pollingHandlerFunction(newChatPollingId?._id, chatMessageObject);
      dispatch(updateChatStateAction({ newChatPollingId: null }));
    }
  }, [chatId, chatMessageObject?.[chatId], newChatPollingId]);

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
      let responseLoading = selectedModels.reduce((acc, model) => {
        acc[model] = true;
        return acc;
      }, {});

      setInfo((prev) => ({ ...prev, loading: true, clearInput: true }));

      const json = { question: inputMessage, models: selectedModels };
      const response = await newQuestionAction(chatId, json);
      let finalObjectUpdateState = { clearInput: false, allModelLoading: true };

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
        pollingHandlerFunction(response?.[1]?.pollingId, updatedMessageObject);

        // state update
        finalObjectUpdateState.responseLoading = { ...info.responseLoading, ...responseLoading };
      } else {
        toast.error(response?.[1]?.message || 'something went wrong');
      }

      setInfo((prev) => ({ ...prev, ...finalObjectUpdateState }));
    },
    [info?.loading, info?.clearInput, info?.responseLoading, chatId, chatMessageObject]
  );

  const pollingHandlerFunction = (pollingId, latestChatMessageObject) => {
    let query = {
      userId: profileDetails?._id,
      messageId: pollingId,
    };

    const apiPollingFunction = async () => {
      const response = await pollingAnswerAction(query);
      if (response[0] === true) {
        if (response[1]?.isRecievedAllResponses) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          setInfo((prev) => ({
            ...prev,
            loading: false,
            responseLoading: { chatgpt: false, gemini: false, deepseek: false, qrok: false },
            allModelLoading: false,
          }));

          const updateRedux = _.cloneDeep(latestChatMessageObject);
          updateRedux?.[chatId]?.docs?.forEach((item) => {
            if (item._id === pollingId) {
              item.responses = response[1]?.data?.responses;
            }
          });

          dispatch(updateChatStateAction({ chatMessageObject: _.cloneDeep(updateRedux) }));
        } else {
          const activeModels = response[1]?.data?.models;
          const answerResponses = response[1]?.data?.responses;
          let updateResponseLoading = {};
          let updateReduxAnswer = {};

          activeModels?.forEach((singleModel) => {
            if (answerResponses?.[singleModel]?.answer) {
              updateResponseLoading[singleModel] = false;
              updateReduxAnswer[singleModel] = answerResponses?.[singleModel];
            }
          });

          if (_.size(updateResponseLoading) > 0) {
            setInfo((prev) => ({
              ...prev,
              loading: false,
              responseLoading: { ...prev.responseLoading, ...updateResponseLoading },
            }));

            const updateRedux = _.cloneDeep(latestChatMessageObject);
            updateRedux[chatId].docs.forEach((item) => {
              if (item._id === pollingId) {
                item.responses = { ...item.responses, ...updateReduxAnswer };
              }
            });

            dispatch(updateChatStateAction({ chatMessageObject: _.cloneDeep(updateRedux) }));
          }
        }
      }
    };

    // Clear any existing interval before setting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const intervalId = setInterval(apiPollingFunction, 1000);
    intervalRef.current = intervalId;
  };

  return (
    <ChatLayout>
      {messageLoading ? (
        <ChatSkeleton className="m-0 h-full" />
      ) : (
        <>
          <ChatWindow info={info} />
          <ChatFooter
            onClickFunction={submitNewQuestionHandlerFunction}
            loading={info?.loading || info?.allModelLoading}
            clearInput={info?.clearInput}
            activeModels={
              newChatPollingId?.models || _.first(chatMessageObject?.[chatId]?.docs)?.models
            }
          />
        </>
      )}
    </ChatLayout>
  );
};

export default memo(Chat);
