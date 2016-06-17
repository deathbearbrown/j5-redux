'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = [];

function ledReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADD_LED) {
    console.log('action', action);
    return [{
      id: action.id,
      on: false,
      blink: false,
      brightness: 128,
      pin: action.pin
    }].concat(state);
  }

  if (action.type === types.SET_LED) {
    return state.map(function(led) {
      return led.id === action.id ?
        assign({}, led, {
          on: action.on,
          blink: action.blink,
          brightness: action.brightness
        }) :
        led;
    });
  }

  return state;
}

module.exports = ledReducer;