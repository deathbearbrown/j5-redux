'use strict';
var five = require('johnny-five');
var store = require('../store');
var addLed = require('../actions/ledActions').addLed;
var onLed = require('../actions/ledActions').on;

/**
 * Lights Class
 * Instantiates LEDs in Johnny Five
 * Inserts references of LED and it's ON or BLINK state in redux
 * Subscribes to changes in redux state & triggers actions on j5
 *
 * @param {array} array of id and pins to be instantiated for the app
 * @returns {Class Lights} returns the Lights class
 */

var Lights = function(pinsArray) {
  this.leds = {};
  this.state = {
    leds: null
  };

  this.setUpLeds(pinsArray);
  this.unsubscribeLeds = store.subscribe(this.ledListenerEvents.bind(this));
  this.ledListenerEvents();

  return this;
};

/**
 * Set Up Leds
 * instantiate j5 led
 * Push led state to redux
 * @param {Array} pinsArray array of id and pins to be instantiated for the app
 */
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

/**
 * Get Leds State
 * @param  {object} redux state
 * @returns {array} led array
 */
Lights.prototype.getLedsState = function(state) {
  return state.leds;
};


/**
 * Register LED listerner
 * Check for changes in redux state and change J5 LED based on change
 *
 */
Lights.prototype.ledListenerEvents = function() {
  var previousValue = this.state.leds;
  var current = this.state.leds = this.getLedsState(store.getState());
  if (previousValue) {
    for (var i =0; current.length > i; i++){
       if (previousValue && previousValue[i].on !== current[i].on) {
        var ledId = current[i].id;
        var ledState = current[i].on ? 'on' : 'off';
        this.leds[ledId][ledState]();
        console.log('Turn ' + ledId + ':' + ledState);
       }
    }
  }
};

module.exports = Lights;
