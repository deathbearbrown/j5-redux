'use strict';
var store = require('./store');
var InitJ5 = require('./components/initJ5');
var isEqual = require('lodash.isequal');

var j5Store = 'J5';

var Test = function() {
  this.state = {
    buttons: {},
    sensors: {}
  };

  this.sensors = new InitJ5({
      five: 'Sensor',
      store_name: 'potentiometer',
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

  this.buttons = new InitJ5({
      five: 'Button',
      store_name: 'game_buttons',
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
  var buttonsKey = this.buttons.storeKey;
  return state[j5Store][buttonsKey].white_button;
};

Test.prototype.getBlackButtonsState = function(state) {
  var buttonsKey = this.buttons.storeKey;
  return state[j5Store][buttonsKey].black_button;
};

Test.prototype.getSensorState = function(state) {
  var sensorsKey = this.sensors.storeKey;
  return state[j5Store][sensorsKey].cool;
};


Test.prototype.buttonListenerEvents = function() {
  // white button
  var previousW = this.state.buttons.white || {};
  var currentW = this.state.buttons.white = this.getWhiteButtonsState(store.getState());
  if ( !isEqual(previousW, currentW)) {
    if (currentW.status === 'press'){
      console.log('This white button is getting pressed!');
    }
  }
  //black button
  var previousB = this.state.buttons.black || {};
  var currentB = this.state.buttons.black = this.getBlackButtonsState(store.getState());
  if ( !isEqual(previousB, currentB)) {
    if (currentB.status === 'hold'){
      console.log('Holding down the Black Button');
    }
  }

  // sensor
  var previousS = this.state.sensors.cool || {};
  var currentS = this.state.sensors.cool = this.getSensorState(store.getState());
  if ( !isEqual(previousS, currentS)) {
    if (currentS.level > 100 ){
      console.log('Potentiometer is 100 <', currentS.level);
    }
  }

};


module.exports = Test;