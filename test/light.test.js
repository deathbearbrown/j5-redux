"use strict";
require("./bootstrap");

var Leds = require("../app/j5-modules/led");

describe("Light class", () => {
  var leds;
  var board;
  var stubs = {};
  var spies = {};

  beforeEach(function() {
    board = newBoard();

    spies.Led = sandbox.spy(five, "Led");
    stubs.ledListenerEvents = sandbox.stub(Leds.prototype, "ledListenerEvents");

    leds = new Leds([{
      id: "green",
      pin: "a2"
    }, {
      id: "red",
      pin: "a3"
    }]);
  });

  afterEach(function() {
    cleanup();
  });

  it("leds have an leds property", function() {
    expect(leds).to.have.property("leds");
  });

  it("Initialized two Led instances", function() {
    expect(spies.Led.callCount).to.equal(2);
  });

  it("Calls ledListenerEvents for both of the two Led instances", function() {
    expect(stubs.ledListenerEvents.callCount).to.equal(1);
  });

  it("setUpLeds is called with array of stuff", function() {

    stubs.setUpLeds = sandbox.stub(Leds.prototype, "setUpLeds");

    var stuff = [{
      id: "green",
      pin: "a2"
    }, {
      id: "red",
      pin: "a3"
    }];

    leds = new Leds(stuff);

    expect(stubs.setUpLeds.callCount).to.equal(1);
    expect(stubs.setUpLeds.lastCall.args[0]).to.eql(stuff);
  });
});
