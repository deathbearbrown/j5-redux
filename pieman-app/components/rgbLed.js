var store = require('../store');
var five = require('johnny-five');
var InitJ5 = require('../util/initJ5');

/**
 * 1 Cathode RGB Led
 *
 * Buy: https://www.sparkfun.com/products/105
 * JS RGB Led docs & fritzing diagram: http://johnny-five.io/api/led.rgb/
 *
 * Note: you can also use 4 leds [red yellow, green, blue]
 */
var RGBLed = function() {
  console.log('hi');
  return new InitJ5({
    five: {
      class: five.Led.RGB,
      args: [{
        id: 'rgb',
        pins: {
          red: 6,
          green: 5,
          blue: 3
        }
      }]
    },
    store: {
      name: 'game_light',
      defaults: {
        color: "red",
        on: false,
        blink: false
      }
    },
    listenersSubscribe: {
      color: function(state, j5) {
        if (state.on) {
          j5.color(state.color);
        } else {
          j5.stop().off();
        }
      },
      on: function(state, j5) {
        if (state.on) {
          j5.color(state.color);
          j5.on();
        } else {
          j5.stop().off();
        }
      },
      blink: function(state, j5) {
        if (state.blink) {
          j5.blink();
        } else {
          j5.stop().off();
        }
      }
    }
  });
};

module.exports = RGBLed;