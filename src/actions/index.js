export const INIT_SOCKET = 'INIT_SOCKET';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const initSocketAction = () => ({
  type: INIT_SOCKET,
});

export const sendMessageAction = (messageText) => ({
  type: SEND_MESSAGE,
  payload: messageText,
});

export const addMessageAction = (messageText) => ({
  type: ADD_MESSAGE,
  payload: messageText,
});
