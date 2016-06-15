'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  sensor: null,
  leds:[]
};
module.exports = configureStore(defaultState);
