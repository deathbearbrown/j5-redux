"use strict";
require("../bootstrap");
var Buttons = require("../../pieman-app/components/buttons");
var store = require('../../pieman-app/store');
var gameActions = require('../../pieman-app/actions/piemanActions');
var j5ReduxActions = require('../../pieman-app/actions/j5ReduxActions');
/*
I want to make sure that the listeners logic being passed to
this component is doing the right thing since it's functionality
drives how the game works
*/
describe("Button Game", () => {
  var board;
  var leds;
  var spies = {};
  var fakeStore;
  var game;

  beforeEach(function() {
    board = newBoard();
    game = Buttons.game;

    // spies
    spies.actionsPress = sandbox.spy(gameActions, "addPress");
    spies.actionsAdvance = sandbox.spy(gameActions, "advance");
    spies.actionsGameOver = sandbox.spy(gameActions, "gameover");

  });

  afterEach(function() {
    cleanup();
  });

  it('game.logic() calls addPress when color is correct but not the last in the sequence', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount:0,
        round: 1,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = game.logic('red', Allstate);
    expect(spies.actionsPress.callCount).to.equal(1);
  });

  it('gamelistener calls advance when color is correct and not at end of sequence', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount:0,
        round: 1,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = game.logic('red', Allstate);
    expect(spies.actionsAdvance.callCount).to.equal(1);
  });

  it('gamelistener calls gameover when color is correct and at end of sequence', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount:2,
        round: 2,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = game.logic('yellow', Allstate);
    expect(spies.actionsGameOver.callCount).to.equal(1);
  });


  it('gamelistener calls gameover for failure', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount: 2,
        round: 2,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = game.logic('orange', Allstate);
    expect(spies.actionsGameOver.callCount).to.equal(1);
  });

});