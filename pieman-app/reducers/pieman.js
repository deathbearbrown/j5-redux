'use strict';
var types = require('../constants/actionTypes');

var initialState = {
  listening: false,
  round: 0,
  pressCount: 0,
  sequence: [],
  gameover: false,
  newGame: false
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

  if (action.type === types.NEW_GAME) {
    return Object.assign({}, state, action.data);
  }

  if (action.type === types.RESET_PRESS) {
    state.pressCount = 0;
    return state;
  }

  if (action.type === types.RESET_GAME) {
    return Object.assign({}, state, action.data);
  }

  if (action.type === types.LISTENING_ON) {
    state.listening = action.on;
    return state;
  }

  if (action.type === types.SET_SEQUENCE) {
    state.sequence = action.sequence;
    return state;
  }

  if (action.type === types.SET_GAMEOVER) {
    return Object.assign({}, state, action.data);
  }

  return state;
}

module.exports = piemanReducer;