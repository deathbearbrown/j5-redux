'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  J5: {},
  pieman: {
    listening: false,
    round: 0,
    pressCount: 0,
    sequence: []
  }
};
module.exports = configureStore(defaultState);
