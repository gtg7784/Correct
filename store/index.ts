import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer, {RootState} from './reducers';

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if (env === 'development') {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

const configureStore = (preloadedState?: RootState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

export default configureStore;
