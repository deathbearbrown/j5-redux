'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  sensor: null,
  buttons: [],
  leds: [],
  on: false
};
module.exports = configureStore(defaultState);
