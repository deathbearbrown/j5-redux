'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
var Potentiometer = require('./app/j5/potentiometer');
var Light = require('./app/j5/light');
var store = require('./app/store');
var board = new five.Board({
  io: new Tessel()
});
board.on("ready", function() {
  var potentiometer = new Potentiometer("a4", 2050);
  var GRLed = new Light([
      {
        "store_key": "green",
        "pin":"a2"
      },
      {
        "store_key": "red",
        "pin": "a3"
      }
    ]);

  board.repl.inject({
    sensorState: function() {
      potentiometer.logStore();
    },
    ledState: function() {
      return GRLed.leds;
    }
  });

});