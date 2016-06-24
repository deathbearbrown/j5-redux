'use strict';
var store = require('./store');
var InitJ5 = require('./util/initJ5');
var isEqual = require('lodash.isequal');

var j5Store = 'J5';

var Test = function() {
  this.state = {
    buttons: {},
    sensors: {}
  };
  this.RGBled = new InitJ5({
      five: 'Led.RGB',
      store_name: 'led_rgb',
      args: [
       {
        id: 'led_rgb1',
        pins: {
          red: 6,
          green: 5,
          blue: 3
        }
       }
      ],
      store_default_args: {
        color: 'red',
        on: false,
        blink: false,
        intensity: 100
      }
    });

  this.RGBled.components.led_rgb1.strobe();

  // this.buttons = new InitJ5({
  //     five: 'Button',
  //     store_name: 'game_buttons',
  //     args: [
  //       {
  //         id: 'white_button',
  //         pin: '2'
  //       },
  //       {
  //         id: 'black_button',
  //         pin: '4'
  //       }
  //     ],
  //     store_default_args: {
  //       status: null
  //     },
  //     events: [{
  //       name: 'press',
  //       store: {
  //         dynamic: false,
  //         key: 'status',
  //         value: 'press'
  //       }
  //     },
  //     {
  //       name: 'hold',
  //       store: {
  //         dynamic: false,
  //         key: 'status',
  //         value: 'hold'
  //       }
  //     },
  //     {
  //       name: 'release',
  //       store: {
  //         dynamic: false,
  //         key: 'status',
  //         value: 'release'
  //       }
  //     }]
  //   });

  // subscribe to buttons
  this.unsubscribe = store.subscribe(this.listenerEvents.bind(this));
  this.listenerEvents();

  return this;
};


Test.prototype.listenerEvents = function() {


};


module.exports = Test;