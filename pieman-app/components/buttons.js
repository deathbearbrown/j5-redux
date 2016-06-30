var store = require('../store');
var five = require('johnny-five');
var J5Redux = require('../util/j5Redux');
var setJ5 = require('../actions/j5ReduxActions').setJ5Components;
var gameActions = require('../actions/piemanActions');

// I want these console logs to show up when you're playing the game as a UI component
// but I don't want them to show up when I'm running my tests
// For no reason other than it looks ugly...
var showLogs = !process.env.IS_TEST_MODE;

/**
 * @namespace
 */
var game = {
  /**
   * Continue to the next round (show light sequence etc etc)
   * @param  {string} color - color of button pressed
   * @param  {string} wantedColor - color wanted in sequence
   * @return {void}
   */
  advanceGame: function(color, wantedColor){
    store.dispatch(gameActions.addPress());
    if (showLogs) console.log('correct!', color + ' is ' + wantedColor + "! Advance game!");
    store.dispatch(gameActions.advance());
  },

  /**
   * Set the game status to gameoverand log out the state
   * @return {void}
   */
  winGame: function(){
    if (showLogs) console.log('you won!');
    store.dispatch(gameActions.gameover(true));
    if (showLogs) console.log('press any button to play again!');
    return;
  },

  /**
   * Set game status to gameover. Log out failure.
   * @param  {string} color - color of button pressed
   * @param  {string} wantedColor - color wanted in sequence
   * @return {void}
   */
  loseGame:function(color, wantedColor){
    if (showLogs) console.log('Oh No!', color + ' is not ' + wantedColor + '. ~Game over~');
    store.dispatch(gameActions.gameover(true));
    if (showLogs) console.log('press any button to play again!');
  },
  /**
   * Logic around the button listeners for the game mechanics
   * @param  {string} color    - button color
   * @param  {object} allstate - redux state object
   * @return {void}
   */
  logic: function(color, allstate){
    var pressCount = allstate.pieman.pressCount;
    var round = allstate.pieman.round;
    var colors = allstate.pieman.sequence;
    var wantedColor = colors[pressCount];
    if (color === wantedColor) {
      if (round > pressCount || round === pressCount) {
        if (pressCount === colors.length - 1) {
          this.winGame();
        } else {
          this.advanceGame(color, wantedColor);
        }
      }
    } else {
      this.loseGame(color, wantedColor);
    }
  }
};

/**
 * 4 colored buttons [Red, Yellow, Green, Blue]
 *
 * Buy: https://www.sparkfun.com/products/10302
 * Button fritzing diagram: http://johnny-five.io/examples/button/
 * J5 Button docs: http://johnny-five.io/api/button/
 */
var buttons = function() {
  return new J5Redux({
    five: {
      class: five.Button,
      args: [{
        id: 'red',
        pin: 'a4'
      }, {
        id: 'yellow',
        pin: 'a3'
      }, {
        id: 'green',
        pin: 'b4'
      }, {
        id: 'blue',
        pin: 'b3'
      }]
    },
    store: {
      name: 'game_buttons',
      defaults: {
        status: 'booga'
      }
    },
    eventsDispatch: {
      /**
       * Set redux status to press on Button Press event
       * @return {void}
       */
      press: function() {
        store.dispatch(setJ5(
          this.id, {
            status: 'press'
          },
          'game_buttons'
        ));
      },
      /**
       * Set redux status to release on Button release event
       * @return {void}
       */
      release: function() {
        store.dispatch(setJ5(
          this.id, {
            status: 'release'
          },
          'game_buttons'
        ));
      }
    },
    listenersSubscribe: {
      /**
       * Redux subscriber for Status of buttons
       * - Dispatch events only if in listening mode
       * - check if in gameover mode to start new game
       * - on press dispatch rgb led state change to light up according to button color
       * - on release dispatch rgb led state change to turn off light
       * - on release run game logic
       * @param  {object} state - redux state
       * @param  {object} j5 - Johnny five button Component
       * @return {void}
       */
      status: function(state, j5) {
        var allState = store.getState();
        // only dispatch events if listener is set to true
        // otherwise you will interfere with the game sequence
        if (allState.pieman.listening) {
          if (allState.pieman.gameover && state.status === 'release'){
            store.dispatch(setJ5('rgb', {on: false, rainbow: false}, 'game_light')); // turn off led
            store.dispatch(gameActions.newGame()); // new game
            return;
          }
          if (state.status === 'press') {
            var data = {
              on: true,
              blink: false,
              color: j5.id,
              rainbow: false
            };
            store.dispatch(setJ5('rgb', data, 'game_light'));
          } else if (state.status === 'release') {
            // game callback on release --------------------------
            store.dispatch(setJ5('rgb', {on: false, rainbow: false}, 'game_light'));
            game.logic(j5.id, allState); // must be called after dispatch to update led state
          }
        }
      }
    }
  });
};

// if test mode add initializer object to the export so I can test it :)
if (process.env.IS_TEST_MODE) {
  buttons.game = game;
}

module.exports = buttons;