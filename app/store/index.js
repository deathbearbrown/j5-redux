var configureStore = require('./configureStore');
var defaultState = {
  led_on: false,
  blink: false,
  start_game: false,
  end_game: false,
}
module.exports = configureStore(defaultState);
