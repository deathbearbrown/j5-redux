'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  J5: {},
  pieman: {
    listening: false,
    round: 0,
    pressCount: 0,
    sequence: [],
    gameover: false
  }
};
module.exports = configureStore(defaultState);
