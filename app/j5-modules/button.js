'use strict';
var five = require('johnny-five');
var store = require('../store');
var setButton = require('../actions/buttonActions').setButton;
var addButton = require('../actions/buttonActions').addButton;

/**
 * Button sensor class
 * @param {array} button objects
 * @returns {Class Button} Button class
 */

var Button = function(buttons) {
  this.buttons = [];

  this.setUpButtons(buttons);

  return this;
};

Button.prototype.setUpButtons = function(buttons) {
  var newButton;
  for (var i = 0; i < buttons.length; i++) {
    newButton = new five.Button({
      pin: buttons[i].pin,
      id: buttons[i].id,
      invert: buttons[i].invert || false
    });
    // add to store
    store.dispatch(addButton(buttons[i]));
    // add events
    this.addEvents(newButton, buttons[i].id);
    // add to class cache
    this.buttons[buttons[i].id] = newButton;
  }
}

/**
 * Dispatch input from sensor into redux
 */
Button.prototype.addEvents = function(button, id) {
  button.on('press', function() {
    store.dispatch(setButton(
      {
        id: id,
        status: 'press'
      }
    ));
  });
  button.on('hold', function() {
    store.dispatch(setButton(
      {
        id: id,
        status: 'hold'
      }
    ));
  });
  button.on('release', function() {
    store.dispatch(setButton(
      {
        id: id,
        status: 'release'
      }
    ));
  });
};

/**
 * Helper method for reading redux from repl
 */
Button.prototype.logStore = function() {
  console.log(store.getState('buttons').get('status'));
};

module.exports = Button;