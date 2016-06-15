'use strict';
var assign = require('object-assign');
var types = require('../constants/actionTypes');

var initialState = [{
  level: 0,
}];

function sensorReducer(state, action) {
  state = state || initialState;
  if (action.type === types.SET_SENSOR) {
    return assign({}, state, {level: action.level});
  }
  return state;
}

module.exports = sensorReducer;