import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'src/reducers';
import socketMiddleware from 'src/middlewares/socket';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
  })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    // here we will add the middlewares
    socketMiddleware,
  ),
  // other store enhancers if any
);

export default createStore(
  reducers,
  enhancer,
);
