'use strict';
var five = require('johnny-five');
var store = require('../store');
var setJ5Components = require('../actions/initJ5Actions').setJ5Components;
var addJ5Components = require('../actions/initJ5Actions').addJ5Components;

/**
 * J5Components sensor class
 * @param {object} config object
 * Example:
    {
      five: 'Button',
      store_name: 'game_buttons',
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
 * @returns {Class J5Components} J5Components class
 */

var J5Components = function(config) {
  this.components = [];
  this.defaults = config.store_default_args;
  this.storeKey = config.store_name;

  this.events = config.events;
  this.setUpComponents(config);
  return this;
};

/**
 * Instantiate the Johnny Five component
 * Add a reference to it in redux
 * If it has state altering events (input components like buttons), create events & dispatchers
 * Store J5 component reference
 * @param {[type]} config [description]
 */
J5Components.prototype.setUpComponents = function(config) {
  var newJ5Component, id;
  for (var i = 0; i < config.args.length; i++) {
    newJ5Component = new five[config.five](config.args[i]);
    id = config.args[i].id;

    // add to store
    this.addToStore(id, this.defaults, this.storeKey);

    // add events that dispatch to store
    //if (this.events) {
    this.addEvents(newJ5Component, id, this.storeKey);
    //}

    // add to class cache
    this.components[id] = newJ5Component;
  }
}

/**
 * set up in redux
 */
J5Components.prototype.addToStore = function(id, defaultState, storeName){
  store.dispatch(addJ5Components(id, defaultState, storeName));
}

/**
 * Add event to J5 component with dispatch to redux
 */
J5Components.prototype.addEvents = function(five, id, state) {
  var events = this.events;
  events.forEach(function(event){
    five.on(event.name, function(){
      var data = {};
      console.log(event.name);
      if (!event.store.dynamic){
        data[event.store.key] = event.store.value;
      } else {
        data[event.store.key] = this[event.store.value];
      }
      store.dispatch(setJ5Components(id, data, state));
    });
  });
};

/**
 * Helper method for reading redux from repl
 */
J5Components.prototype.logStore = function() {
  console.log(store.getState('J5').get(this.storeKey));
};

module.exports = J5Components;