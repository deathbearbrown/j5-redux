'use strict';
var five = require('johnny-five');
var store = require('../store');
var setSensor = require('../actions/setSensor');

/**
 * Potentiometer sensor class
 * @param {string} pin on the board
 * @param {number} frequency -
 * @returns {Class Potentiometer} Potentiometer class
 */

var Potentiometer = function(pin, frequency, threshold) {
  this.potentiometer = new five.Sensor({
    pin: pin,
    freq: frequency || 250,
    threshold: threshold || 10
  });

  this.setUpStoreEvents();
  return this;
};

/**
 * Dispatch input from sensor into redux
 */
Potentiometer.prototype.setUpStoreEvents = function() {
  this.potentiometer.on('data', function() {
    store.dispatch(setSensor(this.value));
  });
};

/**
 * Helper method for reading redux from repl
 */
Potentiometer.prototype.logStore = function() {
  console.log(store.getState('sensor'));
};

module.exports = Potentiometer;