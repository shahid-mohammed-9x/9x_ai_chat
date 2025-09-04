import {
  CHAT_LIST,
  CHAT_MESSAGES,
  CLEAR_CHAT_ERRORS,
  RESET_CHAT_STATE,
  UPDATE_CHAT_STATE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  chatsList: null,
  messageLoading: null,
  chatMessageObject: {},
  newChatPollingId: null,
};

export const ChatsReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [CHAT_LIST.request]: () => ({
      ...state,
      loading: true,
    }),
    [CHAT_MESSAGES.request]: () => ({
      ...state,
      messageLoading: true,
    }),

    // Success state
    [CHAT_LIST.success]: () => ({
      ...state,
      loading: false, // Ensure loading is set to false on success
      chatsList: action.payload,
    }),
    [CHAT_MESSAGES.success]: () => ({
      ...state,
      messageLoading: false, // Ensure loading is set to false on success
      chatMessageObject: action.payload,
    }),

    // Failure state
    [CHAT_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Failed to load chats', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),
    [CHAT_MESSAGES.fail]: () => ({
      ...state,
      messageLoading: false,
      error: action?.payload?.message || 'Failed to load messages chats', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Updates
    // global state purpose,
    [UPDATE_CHAT_STATE]: () => ({
      ...state,
      ...action.payload,
    }),

    // Clear errors
    [CLEAR_CHAT_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_CHAT_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
