import io from 'socket.io-client';
import { addMessageAction, SEND_MESSAGE, INIT_SOCKET } from 'src/actions';

let socket;

export default (store) => (next) => (action) => {
  switch (action.type) {
    case INIT_SOCKET:
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
        store.dispatch(addMessageAction(message));
      });

      break;
    case SEND_MESSAGE:
      // send the message to the server
      console.log('Je veux envoyer le message', action.payload);
      socket.emit('message', action.payload);
      break;
    default:
      console.log('Je laisse passer cette action: ', action);
      next(action);
  }
};
