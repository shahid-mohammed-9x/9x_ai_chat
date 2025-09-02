import {
  CHAT_LIST,
  CHAT_MESSAGES,
  UPDATE_SUBJECT_STATE,
  CLEAR_CHAT_ERRORS,
  RESET_CHAT_STATE,
} from './constant';
import Service from '../../services';
import * as API from './actionTypes';
import { getAccessToken } from '../../helpers/local-storage';

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

const getChatMessagesAction = (chatId) => async (dispatch) => {
  dispatch({ type: CHAT_MESSAGES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_CHAT}${API.CHATS.ChatMessages}/${chatId}`,
    token
  );
  if (response[0] === true) {
    dispatch({ type: CHAT_MESSAGES.success, payload: response[1].data });
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

// global state function to update
const updateChatStateAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_SUBJECT_STATE,
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
  updateChatStateAction,
  clearChatsErrorsAction,
  resetChatsAction,
};
