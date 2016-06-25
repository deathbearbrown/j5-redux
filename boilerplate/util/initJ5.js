'use strict';
var store = require('../store');
var isEqual = require('lodash.isequal');
var setJ5Components = require('../actions/initJ5Actions').setJ5Components;
var addJ5Components = require('../actions/initJ5Actions').addJ5Components;


var initializers = {
  /**
   * Add a reference to the J5 object into Redux
   * @param {array} fiveIDArray  array of j5 id names
   * @param {object} defaults    object of store defaults
   * @param {string} storename   the key of the object everything will be stored under in redux
   */
  setUpRedux: function(fiveIDArray, defaults, storename){
    for (var i = 0; fiveIDArray.length > i; i++){
      store.dispatch(addJ5Components(fiveIDArray[i], defaults, storename));
    }
  },

  /**
   * Instantiate Johnny Five module and add to object
   * @param {Johnny Five Class} five Johnny Five class (five.LED, five.Sensor etc)
   * @returns {object} object with references to the j5 objects
   */
  setUpFive: function(five){
    var fiveClass = five.class,
        j5_objects = {},
        newJ5Component;

    for (var i = 0; i < five.args.length; i++) {
      newJ5Component = new fiveClass(five.args[i]);
      // add to class cache
      j5_objects[five.args[i].id] = newJ5Component;
    }
    return j5_objects;
  },

  /**
   * Set up events for readable J5 objects
   * @param {object} events object of event-type: callback
   * @param {Johnny Five Module} five  reference to a J5 module (led, sensor etc)
   */
  setUpEvents: function(events, five){
    for (var key in events){
      five.on(key, events[key]);
    }
  },

  /**
   * Get what's stored in redux for this class
   * @param  {string} store_name key everything in the class is stored under
   * @param  {string} id         j5_object id
   * @return {object}            redux state
   */
  getStore: function(store_name, id){
    var state = store.getState();
    return state.J5[store_name][id];
  },

  /**
   * Set up listeners for output j5 objects
   */
  setUpListeners: function(){
    var listeners = this.registeredListeners;
    var elements = Object.keys(this.j5_objects);
    var listeningOn = Object.keys(listeners);

    for (var i = 0; elements.length > i; i++) {
      var elementId = elements[i];
      var previous = this.state_cache[elementId];
      var current = this.state_cache[elementId] = initializers.getStore(this.store_name, elementId);
      if (previous){
        for (var x = 0;  listeningOn.length > x; x++){
          var val = listeningOn[x];
          if (current[val] !== previous[val]){
            // pass the status & the five object to the listener
            listeners[val](current[val], this.j5_objects[elementId]);
          }
        }
      }
    }
  }
};

/**
 * J5Components
 * @param {object} spec object
 * Example:
    {
      five: {
        class: five.Button,
        args: [
          {
            id: 'white_button',
            pin: 'b2'
          },
          {
            id: 'black_button',
            pin: 'b3'
          }
        ]
      },
      store: {
        name: 'game_buttons',
        defaults: {
          id: null,
          status: null
        }
      }
      eventsDispatch: {
        press: function(button){
          store.dispatch(setButton(
            {
              id: button.id,
              status: 'press'
            }
          ));
        },
        hold: function(button){
          store.dispatch(setButton(
            {
              id: button.id,
              status: 'hold'
            }
          ));
        },
        release: function(button){
          store.dispatch(setButton(
            {
              id: button.id,
              status: 'release'
            }
          ));
        }
      },
      listenersSubscribe: {
        status: function(){
          // on status change, do this
        }
      }
    }
 * @returns {Class J5Component} J5Component class
 */


var Component = function(spec){
  if (!(this instanceof Component)) {
    return new Component();
  }
  // set up cache ----------------------------
  this.state_cache = {};

  // save info about redux store ------------------
  this.store_name = spec.store.name || '';
  this.default_store = spec.store.defaults;

  // instantiate j5 objects ----------------
  this.j5_objects = initializers.setUpFive(spec.five);

  // set up redux ------------------------------------------------
  initializers.setUpRedux(Object.keys(this.j5_objects), this.default_store, this.store_name);

  // set up events for each j5 object ----------------------------
  if (spec.eventsDispatch) {
    for (var key in this.j5_objects) {
      initializers.setUpEvents(spec.eventsDispatch, this.j5_objects[key]);
    }
  }
  // set up subscribers ------------------------------------------
  if (spec.listenersSubscribe){
    this.registeredListeners = spec.listenersSubscribe;
    var listeners = initializers.setUpListeners.bind(this);
    this.unsubscribe = store.subscribe(listeners);
    listeners();
  }

};

// public stuff I'd like to expose
Component.prototype = {
  getJ5Objects: function(){
    return this.j5_objects;
  },
  getStore: function(j5_object_id){
    if (j5_object_id){
      return store.getState('J5')[this.store_name][j5_object_id];
    }
    return store.getState('J5')[this.store_name];
  },
  log: function(){
    console.log(this.getStore());
  }
};

// if test mode add initializer object to the export so I can test it :)
if (process.env.IS_TEST_MODE) {
  Component.initializers = initializers;
}

module.exports = Component;