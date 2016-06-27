'use strict';
// redux
var store = require('./store');
var setJ5 = require('./actions/initJ5Actions').setJ5Components;
var advance = require('./actions/piemanActions').advance;
var setSequence = require('./actions/piemanActions').setSequence;
var startListener = require('./actions/piemanActions').listening;

// j5
var Buttons = require('./components/buttons');
var Leds = require('./components/rgbLed');

var Game = function(config) {
  if (!(this instanceof Game)) {
    return new Game();
  }

  this.state_cache = {
    round: null
  };

  // state tracking
  this.rounds = 3;

  // set color sequence in redux (this is the source of truth for the game)
  this.sequence = this.setSequence(this.rounds);

  // set up J5
  this.buttons = Buttons();
  this.RGB = Leds();

  // set up listener on current round
  this.unsubscribe = store.subscribe(this.roundListener.bind(this));
  this.roundListener();

  // start game
  //this.playSequence();
};

Game.prototype = {
  roundListener: function() {
    var previous = this.state_cache.round;
    var current = this.state_cache.round = this.getRoundState(store.getState());

    if (current !== previous) {
      this.playSequence(current);
    }
  },

  getSequence: function(state){
    return state.pieman.sequence;
  },

  getRoundState: function(state) {
    return state.pieman.round;
  },

  /**
   * Create array of colors for the memory game
   * @param {number} max - length of array
   */
  setSequence: function(max) {
    var colors = ['red', 'yellow', 'green', 'blue'];
    var sequence = [];
    for (var i = 0; max > i; i++) {
      sequence.push(colors[Math.floor(Math.random() * 4)]);
    }

    // dispatch to redux so it's accessible in other parts of the app
    store.dispatch(setSequence(sequence));
    return sequence;
  },

  /**
   * Flash LED for each color of the sequence up to the round
   */
  playSequence: function(round) {
    var colors = this.sequence;
    var i = 0;
    // ---- turn off listener ---------------
    console.log('Playing sequence, listener off...');
    store.dispatch(startListener(false));

    function ledLoop() {
      setTimeout(function() {
        var data = {
          on: true,
          blink: false,
          color: colors[i]
        };
        console.log(colors[i]);
        store.dispatch(setJ5('rgb', data, 'game_light'));
        i++;
        if (i <= round) {
          ledLoop();
        } else {
          setTimeout(function(){
            data.on = false;
            store.dispatch(setJ5('rgb', data, 'game_light'));
            console.log('Listening to input now ...');
            store.dispatch(startListener(true));
          }, 1000);
        }
      }, 1000)
    }
    ledLoop();
  }
};

module.exports = Game;