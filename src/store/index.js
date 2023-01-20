import {  applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import messages from 'src/features/messages';

import { middlewares as socketsMiddlewares} from 'src/features/sockets'
export default configureStore({
    reducer: {
        messages,
    },
    middleware: [
        ...socketsMiddlewares
    ]
});