import io from 'socket.io-client';
import { addMessage, SEND_MESSAGE } from 'src/actions/messages';
import { INIT_SOCKET } from "src/actions/socket";

let socket;
export default (store) => (next) => (action) => {
    switch (action.type) {
        case INIT_SOCKET: {
            socket = io(process.env.API_BASEURL);

            socket.on('connect', () => {
                console.log('client connected.');
            });

            socket.on('connect_error', (err) => {
                console.log(err);
            });

            socket.on('message', (message) => {
                store.dispatch(addMessage(message));
            });

            break;
        }
        case SEND_MESSAGE: {
            socket.emit('message', action.payload);
            break;
        }
        default:
            break;
    }
    return next(action);
}