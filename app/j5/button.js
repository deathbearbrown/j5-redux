'use strict';
var five = require('johnny-five');
var store = require('../store');
var setSensor = require('../actions/setSensor');

/**
 * Button sensor class
 * @param {string} pin on the board
 * @param {boolean} invert - Invert the up and down values.
 * @returns {Class Button} Button class
 */

var Button = function(pin, invert) {
  this.button = new five.Button({
    pin: pin,
    invert: invert || false
  });

  this.setUpStoreEvents();
  return this;
};

/**
 * Dispatch input from sensor into redux
 */
Button.prototype.setUpStoreEvents = function() {
  this.button.on('data', function() {
    store.dispatch(setSensor(this.value));
  });
};

/**
 * Helper method for reading redux from repl
 */
Button.prototype.logStore = function() {
  console.log(store.getState('button'));
};

module.exports = Button;