'use strict';
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var rootReducer = require('../reducers');

module.exports = function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware());
};
