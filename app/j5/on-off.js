'use strict';
var store = require('../store');
var on = require('../actions/onSwitch');
var onLed = require('../actions/ledActions').onBlink;
var Buttons = require('./button');
var Light = require('./light');

var ButtonLight = function() {
  this.state = {
    buttons: null,
    on: false
  };
  this.leds = new Light([
    {
      store_key: 'red',
      pin: 'a6'
    }
  ]);

  this.buttons = new Buttons([
    {
      store_key: 'white_button',
      pin: 'b2'
    }
  ]);

  // subscribe to buttons
  this.unsubscribeButtons = store.subscribe(this.buttonListenerEvents.bind(this));
  this.buttonListenerEvents();
  this.unsubscribeOn = store.subscribe(this.onListenerEvents.bind(this));
  this.onListenerEvents();

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
        if (current[i].id === 'white_button' && current[i].status === 'press') {
          console.log('pressed');
          store.dispatch(on(!this.state.on));
        }
      }
    }
  }
};

ButtonLight.prototype.onListenerEvents = function(){
  var previousValue = this.state.on;
  var current = this.state.on = store.getState().on;
  if (previousValue !== current) {
    store.dispatch(onLed({id: 'red', on: current}));
  }
};


module.exports = ButtonLight;