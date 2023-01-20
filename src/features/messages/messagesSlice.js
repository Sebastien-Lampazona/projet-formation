import io from 'socket.io-client';
import { createSlice, createListenerMiddleware } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { isMine: false, text: 'Hello' },
    { isMine: true, text: 'Hello' },
    { isMine: true, text: 'Comment vas-tu ?' },
    { isMine: false, text: 'Et bien ça va bien merci et toi ?' },
    { isMine: true, text: 'Super nickel👌' },
    {
      isMine: false,
      text: 'I love cheese, especially cheese and wine cottage cheese. Cauliflower cheese who moved my cheese lancashire blue castello feta cheese strings danish fontina babybel. Smelly cheese danish fontina caerphilly camembert de normandie stinking bishop boursin cheese on toast babybel. Bocconcini melted cheese cheddar caerphilly cow halloumi cream cheese.',
    },
    {
      isMine: true,
      text: 'Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis.',
    },
  ],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    init: () => {},
    send: () => {},
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.push({
        text: action.payload,
        isMine: true,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { init, send, add } = messagesSlice.actions;

let socket = null;
// Create the middleware instance and methods
const sendMessageMiddleware = createListenerMiddleware();
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
sendMessageMiddleware.startListening({
  actionCreator: send,
  effect: async (action) => {
    // send the message to the server
    console.log('J\'envoie le message sur le serveur socket', action.payload);
    socket.emit('message', action.payload);
  },
});

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
const initMessageMiddleware = createListenerMiddleware();
initMessageMiddleware.startListening({
  actionCreator: init,
  effect: async (action, listenerApi) => {
    // initiliaze socket connexion
    console.log('Initialisation des sockets');
    socket = io(process.env.API_BASEURL);

    socket.on('connect', () => {
      console.log('client connected.');
    });

    socket.on('connect_error', (err) => {
      console.log(err);
    });

    socket.on('connect_timeout', () => {
      console.log('connect_timeout');
    });

    socket.on('reconnect_attempt', () => {
      console.log('reconnect_attempt');
    });

    socket.on('reconnecting', () => {
      console.log('reconnecting');
    });

    // Gestion des actions reçues du serveur
    socket.on('message', (message) => {
      listenerApi.dispatch(add(message));
    });
  },
});

export const middlewares = [
  initMessageMiddleware.middleware,
  sendMessageMiddleware.middleware,
];

export default messagesSlice.reducer;
