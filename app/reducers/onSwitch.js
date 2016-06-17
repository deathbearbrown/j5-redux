'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = false; // off

function onSwitchReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ON_SWITCH) {
    return action.status;
  }
  return state;
}

module.exports = onSwitchReducer;