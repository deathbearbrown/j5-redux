'use strict';
var store = require('../store');
var Inputs = require('../j5-modules/input');
var isEqual = require('lodash.isequal');

var Test = function() {
  this.state = {
    buttons: {},
    sensors: {}
  };

  this.sensors = new Inputs({
      five: 'Sensor',
      state: 'potentiometer',
      args: [
        {
          id: 'cool',
          pin: "A2",
          freq: 250
        }
      ],
      store_default_args: {
        level: 0
      },
      events: [{
        name: 'data',
        store: {
          dynamic: true,
          key: 'level',
          value: 'value'
        }
      }]
  });

  this.buttons = new Inputs({
      five: 'Button',
      state: 'game_buttons',
      args: [
        {
          id: 'white_button',
          pin: '2'
        },
        {
          id: 'black_button',
          pin: '4'
        }
      ],
      store_default_args: {
        status: null
      },
      events: [{
        name: 'press',
        store: {
          dynamic: false,
          key: 'status',
          value: 'press'
        }
      },
      {
        name: 'hold',
        store: {
          dynamic: false,
          key: 'status',
          value: 'hold'
        }
      },
      {
        name: 'release',
        store: {
          dynamic: false,
          key: 'status',
          value: 'release'
        }
      }]
    });

  // subscribe to buttons
  this.unsubscribeButtons = store.subscribe(this.buttonListenerEvents.bind(this));
  this.buttonListenerEvents();

  return this;
};

Test.prototype.getWhiteButtonsState = function(state) {
  return state.input.game_buttons.white_button;
};

Test.prototype.getBlackButtonsState = function(state) {
  return state.input.game_buttons.black_button;
};

Test.prototype.getSensorState = function(state) {
  return state.input.potentiometer.cool;
};


Test.prototype.buttonListenerEvents = function() {
  // white button
  var previousW = this.state.buttons.white || {};
  var currentW = this.state.buttons.white = this.getWhiteButtonsState(store.getState());
  if ( !isEqual(previousW, currentW)) {
    if (currentW.status === 'press'){
      console.log('yo');
    }
  }
  //black button
  var previousB = this.state.buttons.black || {};
  var currentB = this.state.buttons.black = this.getBlackButtonsState(store.getState());
  if ( !isEqual(previousB, currentB)) {
    if (currentB.status === 'hold'){
      console.log('hells no');
    }
  }

  // sensor
  var previousS = this.state.sensors.cool || {};
  var currentS = this.state.sensors.cool = this.getSensorState(store.getState());
  if ( !isEqual(previousS, currentS)) {
    if (currentS.level > 100 ){
      console.log('cool times', currentS.level);
    }
  }

};


module.exports = Test;