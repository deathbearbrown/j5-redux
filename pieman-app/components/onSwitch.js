var store = require('../store');
var five = require('johnny-five');
var J5Redux = require('../util/j5Redux');
var setJ5 = require('../actions/j5ReduxActions').setJ5Components;

/**
 * On off Switch
 *
 * Buy: https://www.sparkfun.com/products/9609
 * Switch docs & fritzing diagram: https://github.com/rwaldron/johnny-five/wiki/Switch
 * Note: you can buy literally hundreds of these little switches on amazon for $2-3
 *
 */
var OnOff = function() {
  return new J5Redux({
    five: {
      class: five.Switch,
      args: [{
        id: 'on_switch',
        pin: 4
      }]
    },
    store: {
      name: 'game_state',
      defaults: {
        on: false
      }
    },
    eventsDispatch: {
      open: function() {
        store.dispatch(setJ5(
          this.id,
          {
            on: true
          },
          'game_state'
        ));
      },
      close: function() {
        store.dispatch(setJ5(
          this.id,
          {
            on: false
          },
          'game_state'
        ));
      }
    }
  });
};

module.exports = OnOff;