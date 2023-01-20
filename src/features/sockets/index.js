import io from 'socket.io-client';
import { createSlice, createListenerMiddleware } from '@reduxjs/toolkit';
import * as messages from 'src/features/messages';

export const socketsSlice = createSlice({
    name: 'sockets',
    reducers: {
        init: () => { },
        sendMessage: () => { }
    }
});

export const { init, sendMessage } = socketsSlice.actions;

let socket;

const initSocketMiddleware = createListenerMiddleware();
initSocketMiddleware.startListening({
    actionCreator: init,
    effect: (action, listenerApi) => {
        socket = io(process.env.API_BASEURL);

        socket.on('connect', () => {
            console.log('client connected.');
        });

        socket.on('connect_error', (err) => {
            console.log(err);
        });

        socket.on('message', (message) => {
            listenerApi.dispatch(messages.add(message));
        });
    }
});

const sendMessageMiddleware = createListenerMiddleware();
sendMessageMiddleware.startListening({
    actionCreator: sendMessage,
    effect: (action) => {
        socket.emit('message', action.payload)
    }
});

export const middlewares = [
    initSocketMiddleware.middleware,
    sendMessageMiddleware.middleware
];