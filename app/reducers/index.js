'use strict';
var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  buttons: require('./button'),
  leds: require('./led'),
  on: require('./onSwitch'),
  sensor: require('./sensor')
});