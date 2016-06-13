import { combineReducers } from 'redux-immutable';

export default combineReducers({
  led: require('./led'),
  piezo: require('./piezo'),
  game: require('./game'),
});