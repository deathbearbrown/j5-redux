'use strict';
var five = require('johnny-five');
var store = require('../store');
var setSensor = require('../actions/setSensor');

/**
 * Sensor sensor class
 * @param {string} pin on the board
 * @param {number} frequency -
 * @param {number} threshold -
 * @returns {Class Sensor} Sensor class
 */

var Sensor = function(pin, frequency, threshold) {
  this.sensor = new five.Sensor({
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
Sensor.prototype.setUpStoreEvents = function() {
  this.sensor.on('data', function() {
    store.dispatch(setSensor(this.value));
  });
};

/**
 * Helper method for reading redux from repl
 */
Sensor.prototype.logStore = function() {
  console.log(store.getState('sensor'));
};

module.exports = Sensor;