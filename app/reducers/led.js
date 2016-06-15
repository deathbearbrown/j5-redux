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
      pin: action.pin
    }].concat(state);
  }

  if (action.type === types.ON_LED){
    return state.map(function(led) {
      return led.id === action.id ?
        assign({}, led, { on: action.on }) :
        led
    });
  }
  return state;
}

module.exports = ledReducer;