"use strict";
require("./bootstrap");

var Lights = require("../app/j5/light");

describe("Light class", () => {
  var lights;
  var board;
  var stubs = {};
  var spies = {};

  beforeEach(function() {
    board = newBoard();

    spies.Led = sandbox.spy(five, "Led");
    stubs.ledListenerEvents = sandbox.stub(Lights.prototype, "ledListenerEvents");

    lights = new Lights([{
      store_key: "green",
      pin: "a2"
    }, {
      store_key: "red",
      pin: "a3"
    }]);
  });

  afterEach(function() {
    cleanup();
  });

  it("lights have an leds property", function() {
    expect(lights).to.have.property("leds");
  });

  it("Initialized two Led instances", function() {
    expect(spies.Led.callCount).to.equal(2);
  });

  it("Calls ledListenerEvents for both of the two Led instances", function() {
    expect(stubs.ledListenerEvents.callCount).to.equal(1);
  });

  it("setUpLeds is called with array of stuff", function() {

    stubs.setUpLeds = sandbox.stub(Lights.prototype, "setUpLeds");

    var stuff = [{
      store_key: "green",
      pin: "a2"
    }, {
      store_key: "red",
      pin: "a3"
    }];

    lights = new Lights(stuff);

    expect(stubs.setUpLeds.callCount).to.equal(1);
    expect(stubs.setUpLeds.lastCall.args[0]).to.eql(stuff);
  });
});
