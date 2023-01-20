import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';
import messagesReducer, {
  middlewares as messagesMiddleware,
} from 'src/features/messages/messagesSlice';
// import socketMiddleware from 'src/middlewares/socket';

export default configureStore({
  reducer: {
    message: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(messagesMiddleware),
});
