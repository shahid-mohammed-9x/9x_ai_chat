import { CHAT_LIST, CHAT_MESSAGES, CLEAR_CHAT_ERRORS, RESET_CHAT_STATE } from './constant';
import Service from '../../services';
import * as API from './actionTypes';
import { getAccessToken } from '../../helpers/local-storage';

const getChatsListAction = () => async (dispatch) => {
  dispatch({ type: CHAT_LIST.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(`${API.BASE_USER}${API.CHATS.UserChats}`, token);
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
    `${API.BASE_USER}${API.CHATS.ChatMessages}/${chatId}`,
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
  clearChatsErrorsAction,
  resetChatsAction,
};
