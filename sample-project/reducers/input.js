'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = {};

function inputReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADD_INPUT) {
    state[action.name] = state[action.name] || {};
    state[action.name][action.id] = action.data;
    return state;
  }

  if (action.type === types.SET_INPUT) {
    state[action.name][action.id] = action.data;
    return state;
  }

  return state;
}

module.exports = inputReducer;