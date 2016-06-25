"use strict";
require("./bootstrap");

var InitJ5 = require("../boilerplate/util/initJ5");
var store = require('../boilerplate/store');
var five = require('johnny-five');
var setJ5Components = require('../boilerplate/actions/initJ5Actions').setJ5Components;

describe("J5Components class", () => {
  var buttons;
  var board;
  var callback;
  var stubs = {};
  var spies = {};


  beforeEach(function() {
    board = newBoard();

    spies.Button = sandbox.spy(five, "Button");
    spies.setUpRedux = sandbox.spy(InitJ5.initializers, "setUpRedux");
    spies.setUpEvents = sandbox.spy(InitJ5.initializers, "setUpEvents");
    spies.setUpListeners = sandbox.spy(InitJ5.initializers, "setUpListeners");
    callback = sinon.spy();

    buttons = new InitJ5(    {
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
            {
              id: button.id,
              status: 'press'
            }
          ));
        },
        hold: function(button){
          store.dispatch(setJ5Components(
            {
              id: button.id,
              status: 'hold'
            }
          ));
        },
        release: function(button){
          store.dispatch(setJ5Components(
            {
              id: button.id,
              status: 'release'
            }
          ));
        }
      },
      listenersSubscribe: {
        status: function(status, j5){
          // huh
          if (status === 'monkey'){
            callback();
          }
        }
      }
    });

  });

  afterEach(function() {
    cleanup();
  });

  it("expect buttons to have a j5_objects property", function() {
    expect(buttons).to.have.property("j5_objects");
  });

  it("expect buttons to have a store_name property", function() {
    expect(buttons).to.have.property("store_name");
  });

  it("Initialized two Button instances", function() {
    expect(spies.Button.callCount).to.equal(2);
  });

  it("Adds a new object to the store under J5", function() {
    var state = store.getState();
    expect(state.J5).to.have.property("game_buttons");
  });

  it("it registers defaults for each component to the store under J5 and it's namespace", function() {
    var state = store.getState().J5.game_buttons;
    expect(state).to.have.property("white_button");
    expect(state).to.have.property("black_button");
  });

  it("it calls setUpRedux once", function() {
    expect(spies.setUpRedux.callCount).to.equal(1);
  });

  it("setUpEvents to be called twice, once for each button", function() {
    expect(spies.setUpEvents.callCount).to.equal(2);
  });

  it("setUpListeners to be called once on init", function() {
    expect(spies.setUpListeners.callCount).to.equal(1);
  });

  it("expect that if the dispatcher changes the state in redux, then the listener will fire", function() {
    store.dispatch(setJ5Components('white_button', { status: 'monkey' }, 'game_buttons'));
    var state = store.getState().J5.game_buttons.white_button;
    expect(state.status).to.equal('monkey');
    expect(callback.called).to.be.true;
  });


});
