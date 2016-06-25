'use strict';
var five = require('johnny-five');
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
          color: "#ffffff",
          on: false,
          blink: false
        }
      },
      listenersSubscribe: {
        color: function(val, j5) {
          // on status change, do this
          j5.color(val);
        },
        on: function(val, j5) {
          if (val){
            j5.on();
          }
          j5.stop().off();

        },
        blink: function(val, j5){
          if (val){
            j5.blink();
          }
          j5.stop().off();
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
            pin: '2'
          },
          {
            id: 'yellow',
            pin: '3'
          },
          {
            id: 'green',
            pin: '4'
          },
          {
            id: 'blue',
            pin: '5'
          }
        ]
      },
      store: {
        name: 'game_buttons',
        defaults: {
          status: null
        }
      },
      eventsDispatch: {
        press: function(button){
          store.dispatch(setJ5(
            {
              id: button.id,
              status: 'press'
            }
          ));
        },
        release: function(button){
          store.dispatch(setJ5(
            {
              id: button.id,
              status: 'release'
            }
          ));
        }
      },
      listenersSubscribe: {
        status: function(val, j5) {
          // could make a map to match Id to another id but
          // for now this I am just using color
          var colorId = j5.id;
          var data = {
              on: false,
              blink: false
            };
          if (val === 'press'){
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

