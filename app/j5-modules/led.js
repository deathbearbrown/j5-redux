'use strict';
var five = require('johnny-five');
var store = require('../store');
var addLed = require('../actions/ledActions').addLed;

/**
 * Leds Class
 * Instantiates LEDs in Johnny Five
 * Inserts references of LED and it's ON or BLINK state in redux
 * Subscribes to changes in redux state & triggers actions on j5
 *
 * @param {array} array of id and pins to be instantiated for the app
 * @returns {Class Leds} returns the Leds class
 */

var Leds = function(pinsArray) {
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
Leds.prototype.setUpLeds = function(pinsArray){
  var newLed;
    // type cast pinsArray?
  for (var i = 0; pinsArray.length > i; i++) {
    // create new LED
    newLed = new five.Led({
      pin: pinsArray[i].pin,
      id: pinsArray[i].id
    });

    // store reference on array in class
    this.leds[pinsArray[i].id] = newLed;

    // store in state
    store.dispatch(addLed(pinsArray[i]));
  }
};

/*
var leds = new five.Leds([
  { id: "red", pin: 3 },
  { id: "green", pin: 5 },
  { id: "blue", pin: 6 },
]);
leds.byId("red");

 */




/**
 * Get Leds State
 * @param  {object} state - redux state
 * @returns {array} led array
 */
Leds.prototype.getLedsState = function(state) {
  return state.leds;
};


/**
 * Register LED listerner
 * Check for changes in redux state and change J5 LED based on change
 *
 */
Leds.prototype.ledListenerEvents = function() {
  var previousValue = this.state.leds;
  var current = this.state.leds = this.getLedsState(store.getState());
  if (previousValue) {
    for (var i = 0; current.length > i; i++) {
      var ledId = current[i].id;
      if (previousValue[i].on !== current[i].on ||
        previousValue[i].blink !== current[i].blink) {

        if (current[i].on && previousValue[i].blink) {
          // stop blink
          this.leds[ledId].stop();
          console.log('stop blink');
        }
        if (current[i].on) {
          // turn on
          this.leds[ledId].on();
          console.log('Turn ' + ledId + ': on');
        }

        if (current[i].blink && !current[i].on) {
          // blink
          this.leds[ledId].blink();
          console.log('Blink ' + ledId + ': on');
        }

        if (!current[i].blink && !current[i].on) {
          // turn off
          this.leds[ledId].off();
          // stop blink
          this.leds[ledId].stop();
          console.log('Turn ' + ledId + ': off  AND stop blink');
        }
      }
      if (previousValue[i].brightness &&
        previousValue[i].brightness !== current[i].brightness) {
        this.leds[ledId].brightness(current[i].brightness);
        console.log('Set brightness to: ' + current[i].brightness);
      }
    }
  }
};

module.exports = Leds;
