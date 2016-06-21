'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  sensor: null,
  buttons: [],
  leds: [],
  on: false,
  input: {}
};
module.exports = configureStore(defaultState);
