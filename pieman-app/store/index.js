'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  J5: {},
  pieman: {}
};
module.exports = configureStore(defaultState);
