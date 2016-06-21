'use strict';
var five = require('johnny-five');
var store = require('../store');
var setInputComponents = require('../actions/inputActions').setInputComponents;
var addInputComponents = require('../actions/inputActions').addInputComponents;

/**
 * InputComponents sensor class
 * @param {object} config object
 * Example:
    {
      five: 'Button',
      state: 'game_buttons',
      args: [
        {
          id: 'white_button',
          pin: 'b2'
        },
        {
          id: 'black_button',
          pin: 'b3'
        }
      ],
      store_default_args: {
        id: null,
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
    }
 * @returns {Class InputComponents} InputComponents class
 */

var InputComponents = function(config) {

  this.stateName = config.name;
  this.events = config.events;
  this.components = [];

  this.setUpComponentss(config);

  return this;
};

InputComponents.prototype.setUpComponentss = function(config) {
  var newInputComponents;
  for (var i = 0; i < config.args.length; i++) {
    newInputComponents = new five[config.five](config.args[i]);
    // add to store
    // Combine default args and five arguments
    store.dispatch(addInputComponents(config.args[i].id, config.store_default_args, config.state));
    // add events
    this.addEvents(newInputComponents, config.args[i].id, config.state);
    // add to class cache
    this.components[config.args[i].id] = newInputComponents;
  }
}

/**
 * Dispatch input from sensor into redux
 */
InputComponents.prototype.addEvents = function(five, id, state) {
  var events = this.events;
  events.forEach(function(event){
    five.on(event.name, function(){
      var data = {};
      if (!event.store.dynamic){
        data[event.store.key] = event.store.value;
      } else {
        data[event.store.key] = this[event.store.value];
      }
      store.dispatch(setInputComponents(id, data, state));
    });
  });
};

/**
 * Helper method for reading redux from repl
 */
InputComponents.prototype.logStore = function() {
  console.log(store.getState('inputs').get(this.stateName));
};

module.exports = InputComponents;