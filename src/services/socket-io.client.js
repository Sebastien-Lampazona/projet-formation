import io from 'socket.io-client';

export const socket = io(process.env.API_BASEURL);

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

export default io;
