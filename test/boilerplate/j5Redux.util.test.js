"use strict";
require("../bootstrap");

var J5Redux = require("../../boilerplate/util/j5Redux");
var store = require('../../boilerplate/store');
var five = require('johnny-five');
var setJ5Components = require('../../boilerplate/actions/j5ReduxActions').setJ5Components;

describe("j5Redux class", () => {
  var buttons;
  var light;
  var board;
  var callback;
  var lightCallback;
  var spies = {};


  beforeEach(function() {
    board = newBoard();

    spies.Button = sandbox.spy(five, "Button");
    spies.setUpRedux = sandbox.spy(J5Redux.initializers, "setUpRedux");
    spies.setUpEvents = sandbox.spy(J5Redux.initializers, "setUpEvents");
    spies.setUpListeners = sandbox.spy(J5Redux.initializers, "setUpListeners");

    callback = sinon.spy();
    lightCallback = sinon.spy();

    light = new J5Redux({
      five: {
        class: five.Led.RGB,
        args: [
          {
            id: 'rgb',
            pins: {
              red: 'a5',
              green: 'a6',
              blue: 'b5'
            }
          }
        ]
      },
      store: {
        name: 'game_light',
        defaults: {
          color: 'orange',
          on: false,
          blink: false
        }
      }
    });

    buttons = new J5Redux({
      five: {
        class: five.Button,
        args: [
          {
            id: 'white',
            pin: 'b2'
          },
          {
            id: 'black',
            pin: 'b3'
          }
        ]
      },
      store: {
        name: 'game_buttons',
        defaults: {
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
        status: function(state, j5){
          var data = {
            on: false,
            blink: false
          };
          if (state.status === 'monkey'){
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

  it("buttons.getj5Objects() will return 2 j5 buttons ", function() {
    var j5Objects = buttons.getJ5Objects();
    expect(j5Objects).to.have.property("white");
    expect(j5Objects).to.have.property("black");
    var allKeys = Object.keys(j5Objects);
    expect(allKeys.length).to.equal(2);
  });

  it("buttons.getState() returns the button state in redux ", function() {
    var getState = buttons.getState();
    var reduxState = store.getState().J5.game_buttons;

    expect(getState).to.be.eql(reduxState);
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
    expect(state).to.have.property("white");
    expect(state).to.have.property("black");
  });

  it("it calls setUpRedux once for each, buttons and light", function() {
    expect(spies.setUpRedux.callCount).to.equal(2);
  });

  it("setUpEvents to be called twice, once for each button", function() {
    expect(spies.setUpEvents.callCount).to.equal(2);
  });

  it("setUpListeners to be called once", function() {
    expect(spies.setUpListeners.callCount).to.equal(1);
  });

  it("if the dispatcher changes the state in redux, then the listener will fire", function() {
    store.dispatch(setJ5Components('white', { status: 'monkey' }, 'game_buttons'));
    var state = store.getState().J5.game_buttons.white;
    expect(state.status).to.equal('monkey');
    expect(callback.called).to.be.true;
  });

  it("buttons.resetReduxState() will reset the state of each button in redux to original state", function() {
    store.dispatch(setJ5Components('white', { status: 'monkey' }, 'game_buttons'));

    buttons.resetReduxState();
    var state = store.getState().J5.game_buttons.white;
    expect(state.status).to.equal(null);
  });

});
