"use strict";
require("./bootstrap");

var InitJ5 = require("../sample-project/components/initJ5");
var store = require('../sample-project/store');

describe("J5Components class", () => {
  var buttons;
  var board;
  var stubs = {};
  var spies = {};

  beforeEach(function() {
    board = newBoard();

    spies.Button = sandbox.spy(five, "Button");
    //stubs.setUpComponents = sandbox.stub(InitJ5.prototype, "setUpComponents");
    buttons = new InitJ5({
      five: 'Button',
      store_name: 'game_buttons',
      args: [
        {
          id: 'white_button',
          pin: '2'
        },
        {
          id: 'black_button',
          pin: '4'
        }
      ],
      store_default_args: {
        status: null
      },
      events: [{
        name: 'press',
        store: {
          dynamic: false,
          key: 'status',
          value: 'press'
        }
      },
      {
        name: 'hold',
        store: {
          dynamic: false,
          key: 'status',
          value: 'hold'
        }
      },
      {
        name: 'release',
        store: {
          dynamic: false,
          key: 'status',
          value: 'release'
        }
      }]
    });

  });

  afterEach(function() {
    cleanup();
  });

  it("expect buttons to have a components property", function() {
    expect(buttons).to.have.property("components");
  });

  it("expect buttons to have a storeKey property", function() {
    expect(buttons).to.have.property("storeKey");
  });

  it("Initialized two Button instances", function() {
    expect(spies.Button.callCount).to.equal(2);
  });

  // it("Calls setUpComponents for both of the two Button instances", function() {
  //   expect(stubs.setUpComponents.callCount).to.equal(1);
  // });

  it("Adds a new object to the store under J5", function() {
    var state = store.getState();
    expect(state.J5).to.have.property("game_buttons");
  });

  it("it registers defaults for each component to the store under J5 and it's namespace", function() {
    var state = store.getState().J5.game_buttons;
    expect(state).to.have.property("white_button");
    expect(state).to.have.property("black_button");
  });


});
