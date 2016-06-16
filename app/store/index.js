'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  sensor: null,
  buttons:[],
  leds:[]
};
module.exports = configureStore(defaultState);
