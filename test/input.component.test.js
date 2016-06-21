"use strict";
require("./bootstrap");

var Inputs = require("../sample-project/components/input");

describe("InputComponents class", () => {
  var inputComponents;
  var board;
  var stubs = {};
  var spies = {};

  beforeEach(function() {
    board = newBoard();

    spies.Button = sandbox.spy(five, "Button");
    stubs.setUpComponents = sandbox.stub(Inputs.prototype, "setUpComponents");
    inputComponents = new Inputs({
      five: 'Button',
      state: 'game_buttons',
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

  it("expect inputComponents to have a components property", function() {
    expect(inputComponents).to.have.property("components");
  });

  it("expect inputComponents to have a stateName property", function() {
    expect(inputComponents).to.have.property("stateName");
  });

  it("Initialized two Button instances", function() {
    expect(spies.Button.callCount).to.equal(2);
  });

  it("Calls setUpComponents for both of the two Button instances", function() {
    expect(stubs.setUpComponents.callCount).to.equal(1);
  });


});
