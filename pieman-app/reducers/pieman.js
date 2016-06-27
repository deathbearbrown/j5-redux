'use strict';
var types = require('../constants/actionTypes');

var initialState = {
  listening: false,
  round: 0,
  pressCount: 0,
  sequence: []
};

function piemanReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADVANCE_ROUND) {
    state.pressCount = 0;
    state.round++;
    return state;
  }

  if (action.type === types.ADD_PRESS) {
    state.pressCount++;
    return state;
  }

  if (action.type === types.RESET_PRESS) {
    state.pressCount = 0;
    return state;
  }

  if (action.type === types.RESET_GAME) {
    state.sequence = [];
    state.pressCount = 0;
    state.round = 0;
    return state;
  }

  if (action.type === types.LISTENING_ON) {
    state.listening = action.on;
    return state;
  }

  if (action.type === types.SET_SEQUENCE) {
    state.sequence = action.sequence;
    return state;
  }

  return state;
}

module.exports = piemanReducer;