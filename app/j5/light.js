'use strict';
var five = require('johnny-five');
var store = require('../store');
var addLed = require('../actions/ledActions').addLed;
var onLed = require('../actions/ledActions').on;

/**
 * Lights class
 * @param {array} pin on the board
 * @param {number} frequency
 */


/**
 * ALL OF THIS IS GROSS AND NEEDS TO BE REFACTORED
 */

var Lights = function(pinsArray) {
  this.leds = {};
  this.state = {
    sensors: null,
    leds: null
  };

  this.setUpLeds(pinsArray);

  // subscribe to sensor
  this.unsubscribeSensor = store.subscribe(this.sensorListenerEvents.bind(this));
  this.sensorListenerEvents();

  this.unsubscribeLeds = store.subscribe(this.ledListenerEvents.bind(this));
  this.ledListenerEvents();

  return this;
};


Lights.prototype.setUpLeds = function(pinsArray){
  var newLed;
    // type cast pinsArray?
  for (var i = 0; pinsArray.length > i; i++) {
    // create new LED
    newLed = new five.Led({
      pin: pinsArray[i].pin,
      id: pinsArray[i].store_key
    });

    // store reference on array in class
    this.leds[pinsArray[i].store_key] = newLed;

    // store in state
    store.dispatch(addLed(pinsArray[i]));
  }
};

Lights.prototype.getSensorState = function(state) {
  return state.sensor.level;
};

Lights.prototype.getLedsState = function(state) {
  return state.leds;
};

Lights.prototype.sensorListenerEvents = function() {
  var previousValue = this.state.sensors;
  this.state.sensors = this.getSensorState(store.getState());

  if (previousValue !== this.state.sensors) {
    if (this.state.sensors && this.state.sensors > 500){
      store.dispatch(onLed({id:"green", on: true}));
      store.dispatch(onLed({id:"red", on: false}));
    } else {
      store.dispatch(onLed({id:"green", on: false}));
      store.dispatch(onLed({id:"red", on: true}));
    }
    console.log('SENSOR', previousValue, 'to', this.state.sensors);
  }
};

Lights.prototype.ledListenerEvents = function() {
  var previousValue = this.state.leds;
  this.state.leds = this.getLedsState(store.getState());
  // THIS IS GROSS ----
  if (previousValue && previousValue[0].on !== this.state.leds[0].on) {
    var greenState = this.state.leds[0].on ? 'on' : 'off';
    console.log('turn green:', greenState);
    this.leds.green[greenState]();
  }

  if (previousValue && previousValue[1].on !== this.state.leds[1].on) {
    var redState = this.state.leds[1].on ? 'on' : 'off';
    console.log('turn red:', redState);
    this.leds.red[redState]();
  }
};



module.exports = Lights;

// store.subscribe() // Register a listener which is called on every state change. Returns unsubscribe.
// store.dispatch()// Dispatch an action
// store.getState() // Get the current state of the store