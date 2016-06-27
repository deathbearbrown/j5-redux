"use strict";
require("./bootstrap");
var Buttons = require("../pieman-app/components/buttons");
var Leds = require("../pieman-app/components/rgbLed");
var store = require('../pieman-app/store');
var five = require('johnny-five');
var gameActions = require('../pieman-app/actions/piemanActions');

/*
I want to make sure that the listeners logic being passed to
this component is doing the right thing since it's functionality
drives how the game works
*/
describe("Button GameListener", () => {
  var board;
  var leds;
  var spies = {};
  var fakeStore;

  beforeEach(function() {
    board = newBoard();
    fakeStore = {
      pieman: {
        listening: true,
        pressCount:0,
        round: 1,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    leds = Leds();
    spies.Button = sandbox.spy(five, "Button");
    spies.actionsPress = sandbox.spy(gameActions , "addPress");
    spies.actionsAdvance = sandbox.spy(gameActions , "advance");
    spies.actionsReset = sandbox.spy(gameActions , "reset");

  });

  afterEach(function() {
    cleanup();
  });

  it('gamelistener calls addPress when color is correct but not the last in the sequence', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount:0,
        round: 1,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = Buttons.gameListener('red', Allstate);
    expect(spies.actionsPress.callCount).to.equal(1);
  });

  it('gamelistener calls advance when color is correct at end of sequence', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount: 2,
        round: 2,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = Buttons.gameListener('yellow', Allstate);
    expect(spies.actionsAdvance.callCount).to.equal(1);
  });

  it('gamelistener calls reset for failure', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount: 2,
        round: 2,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = Buttons.gameListener('orange', Allstate);
    expect(spies.actionsReset.callCount).to.equal(1);
  });

  it('on failure, set led to white and blink', function(){
    var Allstate = {
      pieman: {
        listening: true,
        pressCount: 2,
        round: 2,
        sequence: ['red', 'blue', 'yellow']
      }
    };

    var gl = Buttons.gameListener('orange', Allstate);
    var state = store.getState();
    var led = state.J5.game_light.rgb;

    expect(led.color).to.equal("white");
    expect(led.blink).to.be.true;
  });
});