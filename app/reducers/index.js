'use strict';
var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  buttons: require('./button'),
  leds: require('./led'),
  on: require('./onSwitch'),
  // piezo: require('./piezo'),
  sensor: require('./sensor')
});