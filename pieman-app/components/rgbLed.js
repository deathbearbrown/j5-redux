var store = require('../store');
var five = require('johnny-five');
var J5Redux = require('../util/j5Redux');
var setJ5 = require('../actions/j5ReduxActions').setJ5Components;

/**
 * 1 Cathode RGB Led
 *
 * Buy: https://www.sparkfun.com/products/105
 * JS RGB Led docs & fritzing diagram: http://johnny-five.io/api/led.rgb/
 *
 * RGB LEDs require PWM pins (which are denoted with a ~ on many boards)
 * Tessel's PWM pins are a5, a6, b5, and b6
 * See: https://tessel.io/docs/hardwareAPI
 *
 * Note: you can also use 4 leds [red yellow, green, blue]
 */
var RGBLed = function() {
  return new J5Redux({
    five: {
      class: five.Led.RGB,
      args: [{
        id: 'rgb',
        pins: {
          red: 'a5',
          green: 'a6',
          blue: 'b5'
        }
      }]
    },
    store: {
      name: 'game_light',
      defaults: {
        color: "red",
        on: false,
        blink: false,
        rainbow: false
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
      rainbow: function(state, j5){
        if (state.rainbow){
          var index = 0;
          var rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
          function colorChange() {
            setTimeout(function(){
              index++;
              if (index + 1 === rainbow.length) {
                index = 0;
              }
              if (state.rainbow) {
                store.dispatch(setJ5('rgb', {color:rainbow[index]}, 'game_light'));
                colorChange();
              }
            }, 300);
          }
          colorChange();
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