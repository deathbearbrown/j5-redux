'use strict';
var configureStore = require('./configureStore');
var defaultState = {
  input: {}
};
module.exports = configureStore(defaultState);
