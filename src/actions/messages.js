// Action Type
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

// Action creator
export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload: message
})
