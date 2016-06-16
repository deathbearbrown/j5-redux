'use strict';
var five = require('johnny-five');
var store = require('../store');
var onLed = require('../actions/ledActions').on;
var Potentiometer = require('./potentiometer');
var Light = require('./light');

/**
 * Dial A Light is an app that changes the color of a Bipolar, Tri-color LED
 * based on the input of a potentiometer
 *
 * Green will light up for values over 750
 * Yellow will light up for values between 250 and 750
 * Red will light up for values under 250
 */
var DialALight = function(){
  this.state = {
    sensors: null
  }

  this.potentiometer = new Potentiometer("a4", 2050);
  this.leds = new Light([
      {
        "store_key": "green",
        "pin":"a2"
      },
      {
        "store_key": "red",
        "pin": "a3"
      }
    ]);

  // subscribe to sensor
  this.unsubscribeSensor = store.subscribe(this.sensorListenerEvents.bind(this));
  this.sensorListenerEvents();

  return this;
};

/**
 * Get where the sensor data is store in the redux state
 * @param  {object} state redux state
 * @returns {number} the level of output the potentiometer is giving
 */
DialALight.prototype.getSensorState = function(state) {
  return state.sensor.level;
};

/**
 * Subscriber for the Sensor's level
 * Checks for change in redux and then dispatches changes to LED
 * states in redux
 *
 * DOES NOT MAKE CALLS ON THE J5 OBJECT
 *
 * @returns {void}
 */
DialALight.prototype.sensorListenerEvents = function() {
  var previousValue = this.state.sensors;
  this.state.sensors = this.getSensorState(store.getState());

  if (previousValue !== this.state.sensors) {
    var sensors = this.state.sensors;
    if (sensors && sensors > 750){
      store.dispatch(onLed({id:"green", on: true}));
      store.dispatch(onLed({id:"red", on: false}));
    } else if (sensors && sensors < 750 && sensors > 250) {
      store.dispatch(onLed({id:"green", on: true}));
      store.dispatch(onLed({id:"red", on: true}));
    } else {
      store.dispatch(onLed({id:"green", on: false}));
      store.dispatch(onLed({id:"red", on: true}));
    }
  }
};

module.exports = DialALight;
