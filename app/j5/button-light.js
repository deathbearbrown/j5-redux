'use strict';
var store = require('../store');
var onLed = require('../actions/ledActions').onBlink;
var Buttons = require('./button');
var Light = require('./light');

var ButtonLight = function() {
  this.state = {
    buttons: null
  };
  this.leds = new Light([
    {
      store_key: 'red',
      pin: 'a2'
    }
  ]);

  this.buttons = new Buttons([
    {
      store_key: 'white_button',
      pin: 'b2'
    },
    {
      store_key: 'black_button',
      pin: 'b3'
    }
  ]);

  // subscribe to buttons
  this.unsubscribeButtons = store.subscribe(this.buttonListenerEvents.bind(this));
  this.buttonListenerEvents();

  return this;
};

ButtonLight.prototype.getButtonsState = function(state) {
  return state.buttons;
};

ButtonLight.prototype.buttonListenerEvents = function() {
  var previousValue = this.state.buttons;
  var current = this.state.buttons = this.getButtonsState(store.getState());
  if (previousValue) {
    for (var i = 0; current.length > i; i++) {
      if (previousValue[i].status !== current[i].status) {
        // if (current[i].status === 'press') {
        //   if (current[i].id === 'white_button'){
        //     store.dispatch(onLed({id: 'red', on: true}));
        //   } else {
        //     store.dispatch(onLed({id: 'red', blink: true}));
        //   }
        // }
        if (current[i].status === 'hold') {
          if (current[i].id === 'white_button'){
            store.dispatch(onLed({id: 'red', blink: true}));
          } else {
            store.dispatch(onLed({id: 'red', on: true}));
          }
        }
        if (current[i].status === 'release') {
          store.dispatch(onLed({id: 'red', on: false}));
        }
      }
    }
  }
};


module.exports = ButtonLight;