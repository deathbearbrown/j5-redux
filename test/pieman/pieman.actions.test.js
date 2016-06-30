'use strict';
require('../bootstrap');
var actions = require('../../pieman-app/actions/piemanActions');
var types = require('../../pieman-app/constants/actionTypes');

describe('Pieman actions', () => {
  it('should create an action to turn button listening on', function() {
    var expected = {
      type: 'LISTENING_ON',
      on: true
    };
    expect(actions.listening(true)).to.eql(expected);
  });

  it('should create an action to reset the game', function() {
    var expected = {
      type: 'RESET_GAME',
      data: {
        pressCount: 0,
        round: 0,
        listening: false,
        newGame: false
      }
    };
    expect(actions.reset()).to.eql(expected);
  });

  it('should create an action to advance the round', function() {
    var expected = {
      type: 'ADVANCE_ROUND'
    };
    expect(actions.advance()).to.eql(expected);
  });

  it('should create an action to increase button press', function() {
    var expected = {
      type: 'ADD_PRESS'
    };
    expect(actions.addPress()).to.eql(expected);
  });

  it('should create an action to reset button press to 0', function() {
    var expected = {
      type: 'RESET_PRESS'
    };
    expect(actions.resetPress()).to.eql(expected);
  });

  it('should create an action to set the sequence of colors', function() {
    var expected = {
      type: 'SET_SEQUENCE',
      sequence: ['red', 'green', 'green']
    };
    expect(actions.setSequence(['red', 'green', 'green'])).to.eql(expected);
  });

  it('should create an action to set gameover', function() {
    var expected = {
      type: 'SET_GAMEOVER',
      data: {
        listening: true,
        gameover: true
      }
    };
    expect(actions.gameover(true)).to.eql(expected);
  });

  it('should create an action to set new game', function() {
    var expected = {
      type: 'NEW_GAME',
      data: {
        gameover: false,
        newGame: true
      }
    };
    expect(actions.newGame()).to.eql(expected);
  });
});
