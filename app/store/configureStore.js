import { redux } from 'redux';
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
import rootReducer from '../reducers';

module.exports = function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware());
};
