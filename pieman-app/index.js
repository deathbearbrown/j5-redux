'use strict';
var five = require('johnny-five');
var store = require('./store');
var InitJ5 = require('./util/initJ5');
var Pieman = require('./pieman');
var setJ5 = require('./actions/initJ5Actions').setJ5Components;

var GameSetup = {
  /**
   * set up Johnny five stuff
   * consider putting this in seperate files or a 'components' folder because oh boy, this
   * is a buncha code that sucks to scroll through booooo
   */
  setUpj5: function(){

    /**
     * 1 Cathode RGB Led
     *
     * Buy: https://www.sparkfun.com/products/105
     * JS RGB Led docs & fritzing diagram: http://johnny-five.io/api/led.rgb/
     *
     * Note: you can also use 4 leds [red yellow, green, blue]
     */
    var RGBLed = new InitJ5({
      five: {
        class: five.Led.RGB,
        args: [
          {
            id: 'rgb',
            pins: {
              red: 6,
              green: 5,
              blue: 3
            }
          }
        ]
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
          if (state.color){
            j5.color(state.color);
          }
        },
        on: function(state, j5) {
          console.log(state);
          if (state.on){
            j5.color(state.color);
            j5.on();
          } else {
            j5.off();
          }
        },
        blink: function(state, j5){
          if (state.blink){
            j5.blink();
          } else {
            j5.stop().off();
          }
        }
      }
    });

    /**
     * 4 colored buttons [Red, Yellow, Green, Blue]
     *
     * Buy: https://www.sparkfun.com/products/10302
     * Button fritzing diagram: http://johnny-five.io/examples/button/
     * J5 Button docs: http://johnny-five.io/api/button/
     */
     var buttons = new InitJ5({
      five: {
        class: five.Button,
        args: [
          {
            id: 'red',
            pin: '13'
          },
          {
            id: 'yellow',
            pin: '12'
          },
          {
            id: 'green',
            pin: '8'
          },
          {
            id: 'blue',
            pin: '7'
          }
        ]
      },
      store: {
        name: 'game_buttons',
        defaults: {
          status: 'booga'
        }
      },
      eventsDispatch: {
        press: function(){
          store.dispatch(setJ5(
            this.id,
            {
              status: 'press'
            },
            'game_buttons'
          ));
        },
        release: function(){
          store.dispatch(setJ5(
            this.id,
            {
              status: 'release'
            },
            'game_buttons'
          ));
        }
      },
      listenersSubscribe: {
        status: function(state, j5) {
          // could make a map to match Id to another id but
          // for now this I am just using color
          var colorId = j5.id;
          var data = {
              on: false,
              blink: false
            };
          if (state.status === 'press'){
            data.color = colorId;
            data.on = true;
          }
          store.dispatch(setJ5('rgb', data, 'game_light'));
        }
      }
    });

    return {
      buttons: buttons,
      rgb: RGBLed
    };
  }

};


var Game = function(){
  // j5 objects
  this.j5 = GameSetup.setUpj5();

  this.pieman = new Pieman();

};


module.exports = Game;

