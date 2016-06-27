var store = require('../store');
var five = require('johnny-five');
var InitJ5 = require('../util/initJ5');
var setJ5 = require('../actions/initJ5Actions').setJ5Components;
var gameActions = require('../actions/piemanActions');

var gameListener = function(color, allstate){
  var pressCount = allstate.pieman.pressCount;
  var round = allstate.pieman.round;
  var colors = allstate.pieman.sequence;
  var wantedColor = colors[pressCount];
  console.log("i logic'n", round, pressCount);
  if (color === wantedColor) {
    if (round > pressCount) {
      // add press
      store.dispatch(gameActions.addPress());
      console.log('correct!', color + ' is ' + wantedColor);
    } else if (round === pressCount) {
      if (pressCount === colors.length-1){
        console.log('you won!');
        return;
      }
      //advance game
      console.log('correct!', color + ' is ' + wantedColor + "! Advance game!");
      store.dispatch(gameActions.advance());
    }
  } else {
    console.log('Oh No!', color + ' is not ' + wantedColor);
    // you donked up
    var failLed = {
      on: true,
      blink: true,
      color: "white"
    };
    store.dispatch(gameActions.reset());
    store.dispatch(setJ5('rgb', failLed, 'game_light'));
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
  return new InitJ5({
    five: {
      class: five.Button,
      args: [{
        id: 'red',
        pin: '13'
      }, {
        id: 'yellow',
        pin: '12'
      }, {
        id: 'green',
        pin: '8'
      }, {
        id: 'blue',
        pin: '7'
      }]
    },
    store: {
      name: 'game_buttons',
      defaults: {
        status: 'booga'
      }
    },
    eventsDispatch: {
      press: function() {
        store.dispatch(setJ5(
          this.id,
          {
            status: 'press'
          },
          'game_buttons'
        ));
      },
      release: function() {
        store.dispatch(setJ5(
          this.id,
          {
            status: 'release'
          },
          'game_buttons'
        ));
      }
    },
    listenersSubscribe: {
      status: function(state, j5) {
        var allState = store.getState();
        // only dispatch events if listener is set to true
        // otherwise you will interfere with the game sequence
        if (allState.pieman.listening) {
          console.log('listening');
          var colorId = j5.id;
          var data = {
            on: false,
            blink: false,
            color: colorId
          };
          if (state.status === 'press') {
            data.on = true;
          } else if (state.status === 'release'){
            // game callback -------------------------------
            gameListener(colorId, allState);
          }
          store.dispatch(setJ5('rgb', data, 'game_light'));
        }
      }
    }
  });
};

// if test mode add initializer object to the export so I can test it :)
if (process.env.IS_TEST_MODE) {
  buttons.gameListener = gameListener;
}

module.exports = buttons;