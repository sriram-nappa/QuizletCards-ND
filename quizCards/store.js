import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const configureStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;