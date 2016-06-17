'use strict';
var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  buttons: require('./button'),
  leds: require('./led'),
  // piezo: require('./piezo'),
  sensor: require('./sensor')
});