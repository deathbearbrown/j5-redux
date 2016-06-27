'use strict';
var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  J5: require('./J5'),
  pieman: require('./pieman')
});