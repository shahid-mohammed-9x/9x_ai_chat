import {
  CHAT_LIST,
  CHAT_MESSAGES,
  UPDATE_CHAT_STATE,
  CLEAR_CHAT_ERRORS,
  RESET_CHAT_STATE,
} from './constant';
import Service from '../../services';
import * as API from './actionTypes';
import { getAccessToken } from '../../helpers/local-storage';
import _ from 'lodash';
import { objectToQueryString } from '@/helpers';

const getChatsListAction = () => async (dispatch) => {
  dispatch({ type: CHAT_LIST.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(`${API.BASE_CHAT}${API.CHATS.UserChats}`, token);
  if (response[0] === true) {
    dispatch({ type: CHAT_LIST.success, payload: response[1].data });
  } else {
    dispatch({
      type: CHAT_LIST.fail,
      payload: response[1],
    });
  }
};

const getChatMessagesAction = (chatId) => async (dispatch, state) => {
  dispatch({ type: CHAT_MESSAGES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_CHAT}${API.CHATS.ChatMessages}/${chatId}`,
    token
  );

  const storeState = state();
  let updatedMessageListObject = _.cloneDeep(storeState?.chatsState?.chatMessageObject);
  let keysIds = _.keys(updatedMessageListObject);
  if (_.size(keysIds) < 5) {
    updatedMessageListObject[chatId] = response?.[1]?.data;
  } else {
    delete updatedMessageListObject[keysIds[0]];
    updatedMessageListObject[chatId] = response?.[1]?.data;
  }

  if (response[0] === true) {
    dispatch({
      type: CHAT_MESSAGES.success,
      payload: updatedMessageListObject,
    });
  } else {
    dispatch({
      type: CHAT_MESSAGES.fail,
      payload: response[1],
    });
  }
};

const createNewChatAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(`${API.BASE_CHAT}${API.CHATS.NewChat}`, json, token);
  return response;
};

const newQuestionAction = async (chatId, json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_CHAT}/${chatId}${API.CHATS.NewQuestion}`,
    json,
    token
  );
  return response;
};

const pollingAnswerAction = async (queryObject) => {
  const token = getAccessToken();
  let query = queryObject ? objectToQueryString(queryObject) : '';
  const response = await Service.fetchGet(`${API.BASE_CHAT}${API.CHATS.Polling}${query}`, token);
  return response;
};

// global state function to update
const updateChatStateAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CHAT_STATE,
    payload,
  });
};

const clearChatsErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_CHAT_ERRORS,
  });
};

const resetChatsAction = () => (dispatch) => {
  dispatch({ type: RESET_CHAT_STATE });
};
export default {
  getChatsListAction,
  getChatMessagesAction,
  createNewChatAction,
  newQuestionAction,
  pollingAnswerAction,
  updateChatStateAction,
  clearChatsErrorsAction,
  resetChatsAction,
};
