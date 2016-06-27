'use strict';
var types = require('../constants/actionTypes');

var initialState = {};

function j5Reducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADD_J5) {
    state[action.name] = state[action.name] || {};
    state[action.name][action.id] = action.data;
    return state;
  }

  if (action.type === types.SET_J5) {
    var oldState = state[action.name][action.id];
    state[action.name][action.id] = Object.assign({}, oldState, action.data);
    return state;
  }

  return state;
}

module.exports = j5Reducer;