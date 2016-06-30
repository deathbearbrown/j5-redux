'use strict';
// redux
var store = require('./store');
var setJ5 = require('./actions/j5ReduxActions').setJ5Components;
var advance = require('./actions/piemanActions').advance;
var setSequence = require('./actions/piemanActions').setSequence;
var startListener = require('./actions/piemanActions').listening;
var resetGame = require('./actions/piemanActions').reset;

// j5
var Buttons = require('./components/buttons');
var Leds = require('./components/rgbLed');

/**
 * Simple Pieman game set up to run on a Tessel board
 * See fritzing diagram:
 *
 * Note: Pieman is Simon without the sound.
 * BetterPiezo support in J5 is ~coming soon~.
 *
 * This is a proof of concept application for
 * johnny five and redux as a global state manager.
 *
 * Please submit PRs for suggestions on improvement.
 *
 * Game mechanics:
 * A color sequence will flash on an rgb led
 * Player hits button according to each color in sequence
 *
 * If order is correct, continue until the last round, incrementing one
 * color to the sequence every round
 *
 * If order is incorrect, game will be over
 *
 * On Game Over / Win: press any button to continue.
 * Rounds will be incremented by one
 *
 * This can be run on any board, but the buttons and rgbLed components
 * will need to be updated with the appropriate pin #s
 */
var Game = function() {
  if (!(this instanceof Game)) {
    return new Game();
  }

  this.state_cache = {
    round: null
  };

  // state tracking
  this.rounds = 1;

  // set color sequence in redux (this is the source of truth for the game)
  this.sequence = this.setSequence(this.rounds);

  // set up J5
  this.buttons = Buttons();
  this.RGB = Leds();

  // set up listener on current round
  this.unsubscribe = store.subscribe(this.roundListener.bind(this));
  this.roundListener();

  // set up listener on current round
  this.unsubscribeNewGame = store.subscribe(this.newGameListener.bind(this));
  this.newGameListener();

  // listener for game over
  this.unsubscribeGameOver = store.subscribe(this.gameOverListener.bind(this));
  this.gameOverListener();
};

Game.prototype = {
  newGame: function() {
    this.RGB.resetReduxState();
    // increase rounds
    this.rounds++;
    // create new sequence of colors
    this.sequence = this.setSequence(this.rounds);
    // reset game
    store.dispatch(resetGame());
  },
  /**
   * Listen for gameover status in redux
   * dispatch led to blink
   * note: if I had better piezo support so I coulc do sad sounds or FF battle music
   * @return {void}
   */
  gameOverListener: function() {
    var gameover = store.getState().pieman.gameover;
    if (gameover) {
      store.dispatch(setJ5('rgb', {
        color: "white",
        blink: true
      }, 'game_light'));
    }
  },
  /**
   * Listen for newGame status in redux
   * Start new game on true
   * @return {void}
   */
  newGameListener: function() {
    var newGame = store.getState().pieman.newGame;
    if (newGame) {
      this.newGame();
    }
  },
  /**
   * Listen for round change & play sequence according to round
   * @return {void}
   */
  roundListener: function() {
    var previous = this.state_cache.round;
    var current = this.state_cache.round = this.getRoundState(store.getState());
    if (current !== previous) {
      this.playSequence(current);
    }
  },

  getRoundState: function(state) {
    return state.pieman.round;
  },

  /**
   * Create array of colors for the memory game
   * @param {number} max - length of array
   * @returns {array} array of colors
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
   * Flash an led for each color in the sequence up until a specific
   * index number
   * @param  {number} round - round of the game you are on & index # in sequence
   * @return {void}
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
          color: colors[i],
          rainbow: false
        };
        store.dispatch(setJ5('rgb', data, 'game_light'));
        i++;
        if (i <= round) {
          ledLoop();
        } else {
          setTimeout(function() {
            data.on = false;
            store.dispatch(setJ5('rgb', data, 'game_light'));

            // ---- turn on listener ---------------
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