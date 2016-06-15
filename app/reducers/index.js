'use strict';
var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  leds: require('./led'),
  sensor: require('./sensor')
});