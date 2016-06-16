'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = [];
var tones = {
  A: false,
  B: false,
  C: false,
  D: false
};

function piezoReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADD_LED) {
    console.log('action', action);
    return [{
      id: action.id,
      tones: tones,
      pin: action.pin
    }].concat(state);
  }

  if (action.type === types.ON_LED){
    return state.map(function(piezo) {
      return piezo.id === action.id ?
        assign({}, piezo, { tones: action.tones }) :
        piezo
    });
  }
  return state;
}

module.exports = piezoReducer;