"use strict";
require("./bootstrap");

var InitJ5 = require("../boilerplate/util/initJ5");
var store = require('../boilerplate/store');
var five = require('johnny-five');
var setJ5Components = require('../boilerplate/actions/initJ5Actions').setJ5Components;

describe("J5Components class", () => {
  var buttons;
  var light;
  var board;
  var callback;
  var lightCallback;
  var stubs = {};
  var spies = {};


  beforeEach(function() {
    board = newBoard();

    spies.Button = sandbox.spy(five, "Button");
    spies.setUpRedux = sandbox.spy(InitJ5.initializers, "setUpRedux");
    spies.setUpEvents = sandbox.spy(InitJ5.initializers, "setUpEvents");
    spies.setUpListeners = sandbox.spy(InitJ5.initializers, "setUpListeners");

    callback = sinon.spy();
    lightCallback = sinon.spy();

    light = new InitJ5({
      five: {
        class: five.Led.RGB,
        args: [
          {
            id: 'rgb',
            pins: {
              red: 6,
              green: 5,
              blue: 3
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

    buttons = new InitJ5({
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
        status: function(status, j5){
          var data = {
            on: false,
            blink: false
          };
          if (status === 'monkey'){
            callback();
          }
          if (status === 'testInteraction'){
            data.color = j5.id;
            data.on = true;
            store.dispatch(setJ5Components('rgb', data, 'game_light'));
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
    expect(state).to.have.property("white");
    expect(state).to.have.property("black");
  });

  it("it calls setUpRedux once for each, buttons and light", function() {
    expect(spies.setUpRedux.callCount).to.equal(2);
  });

  it("setUpEvents to be called twice, once for each button", function() {
    expect(spies.setUpEvents.callCount).to.equal(2);
  });

  it("setUpListeners to be called twice for each????? BUG???", function() {
    expect(spies.setUpListeners.callCount).to.equal(2);
  });

  it("if the dispatcher changes the state in redux, then the listener will fire", function() {
    store.dispatch(setJ5Components('white', { status: 'monkey' }, 'game_buttons'));
    var state = store.getState().J5.game_buttons.white;
    expect(state.status).to.equal('monkey');
    expect(callback.called).to.be.true;
  });

  it("button listener will dispatch to light state, light listener will fire", function() {
    store.dispatch(setJ5Components('white', { status: 'testInteraction' }, 'game_buttons'));
    var state = store.getState().J5.game_buttons.white;
    expect(state.status).to.equal('testInteraction');

    var lightState = store.getState().J5.game_light.rgb;
    expect(lightState.color).to.equal('white');
    expect(lightCallback.called).to.be.true;
  });
});
