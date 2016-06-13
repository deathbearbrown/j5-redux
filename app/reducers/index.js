'use strict';
var combineReducers = require('redux-immutable').combineReducers;

module.exports = combineReducers({
  led: require('./led'),
  piezo: require('./piezo'),
  game: require('./game'),
});