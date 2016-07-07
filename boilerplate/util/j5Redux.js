'use strict';
var store = require('../store');
var isEqual = require('lodash.isequal');
var setJ5Components = require('../actions/j5ReduxActions').setJ5Components;
var addJ5Components = require('../actions/j5ReduxActions').addJ5Components;

/**
 * The j5-redux class instantiates Johnny Five components and sets up a reference to them in
 * the redux store with a default state.
 */

var initializers = {
  /**
   * Add a reference to the J5 object into Redux
   * @param {array} fiveIDArray  array of j5 id names
   * @param {object} defaults    object of store defaults
   * @param {string} storename   the key of the object everything will be stored under in redux
   */
  setUpRedux: function(fiveIDArray, defaults, storename) {
    for (var i = 0; fiveIDArray.length > i; i++) {
      store.dispatch(addJ5Components(fiveIDArray[i], defaults, storename));
    }
  },

  /**
   * Instantiate Johnny Five module and add to object
   * @param {Johnny Five Class} five Johnny Five class (five.LED, five.Sensor etc)
   * @returns {object} object with references to the j5 objects
   */
  setUpFive: function(five) {
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
  setUpEvents: function(events, five) {
    for (var key in events) {
      five.on(key, events[key]);
    }
  },

  /**
   * Get what's stored in redux for this class
   * @param  {string} store_name key everything in the class is stored under
   * @param  {string} id         j5_object id
   * @returns {object}            redux state
   */
  getStore: function(store_name, id) {
    var state = store.getState();
    return state.J5[store_name][id];
  },

  /**
   * Set up listeners for output j5 objects
   *
   */
  setUpListeners: function() {
    var listeners = this.registeredListeners;
    var elements = Object.keys(this.j5_objects);
    var listeningOn = Object.keys(listeners);

    for (var i = 0; elements.length > i; i++) {
      var elementId = elements[i];
      var previous = this.state_cache[elementId];
      var current = this.state_cache[elementId] = initializers.getStore(this.store_name, elementId);
      if (previous) {
        for (var x = 0; listeningOn.length > x; x++) {
          var val = listeningOn[x];
          if (current[val] !== previous[val]) {
            // pass the status & the five object to the listener
            listeners[val](current, this.j5_objects[elementId]);
          }
        }
      }
    }
  }
};

/**
 * J5Redux
 * @param {object} spec object
 * @param {object} spec.five - an object containing a Johnny five class & an array
 *                           arguments to instantiate it
 * @param {object} spec.store - object containing a name where this data will be stored under J5 in redux
 *                            And the default values it should be instantiated with
 * @param {object} spec.eventsDispatch - object consisting of {eventName: callback} for J5 events
 * @param {object} spec.listenerSubscribe - object consisting of {reduxKey: callback} for listeners on redux values for
 *                                          items created in this class
 *
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
      },
      eventsDispatch: {
        press: function(button){
          store.dispatch(setJ5Components(
            button.id,
            {
              status: 'press'
            },
            'game_buttons'
          ));
        },
        hold: function(button){
          store.dispatch(setJ5Components(
            button.id,
            {
              status: 'hold'
            },
            'game_buttons'
          ));
        },
        release: function(button){
          store.dispatch(setJ5Components(
            button.id,
            {
              status: 'release'
            },
            'game_buttons'
          ));
        }
      },
      listenersSubscribe: {
        status: function(status, j5){
          if (status === 'press'){
            SomeCallback();
          }
        }
      }
    }
 * @returns {Class J5Redux} J5Redux class
 */


var J5Redux = function(spec) {
  if (!(this instanceof J5Redux)) {
    return new J5Redux();
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
      initializers.setUpEvents.bind(this)(spec.eventsDispatch, this.j5_objects[key]);
    }
  }
  // set up subscribers ------------------------------------------
  if (spec.listenersSubscribe) {
    this.registeredListeners = spec.listenersSubscribe;
    var listeners = initializers.setUpListeners.bind(this);
    this.unsubscribe = store.subscribe(listeners);
    listeners();
  }
};

J5Redux.prototype = {
  /**
   * Get All j5 Components created inside here
   * note: if you manipulate them outside of redux state managment
   * the state will be out of sync
   * @returns {object} - {j5Id: j5Component}
   */
  getJ5Objects: function() {
    return this.j5_objects;
  },
  /**
   * Get the redux store values created in here. Helpful for debugging
   * @param  {string} j5_object_id - retrieve by id
   * @returns {object} - redux state
   */
  getState: function(j5_object_id) {
    var state = store.getState('J5');
    if (j5_object_id) {
      return state.J5[this.store_name][j5_object_id];
    }
    return state.J5[this.store_name];
  },
  /**
   * log out state for debugging
   * @returns {void}
   */
  log: function() {
    console.log(this.getState());
  },
  /**
   * Reset redux state to defaults
   * @returns {void}
   */
  resetReduxState: function(){
    var fiveIDArray = Object.keys(this.j5_objects);
    var defaults = this.default_store;
    for (var i = 0; fiveIDArray.length > i; i++) {
      store.dispatch(setJ5Components(fiveIDArray[i], defaults, this.store_name));
    }
  }
};

// if test mode add initializer object to the export so I can test it :)
if (process.env.IS_TEST_MODE) {
  J5Redux.initializers = initializers;
}

module.exports = J5Redux;