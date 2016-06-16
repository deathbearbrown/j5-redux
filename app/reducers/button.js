'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = [];

function buttonReducer(state, action) {
  state = state || initialState;
  if (action.type === types.ADD_BUTTON) {
    console.log('action', action);
    return [{
      id: action.id,
      status: null,
      pin: action.pin
    }].concat(state);
  }

  if (action.type === types.SET_BUTTON){
    return state.map(function(button) {
      return button.id === action.id ?
        assign({}, button, { status: action.status }) :
        button
    });
  }
  return state;
}

module.exports = buttonReducer;