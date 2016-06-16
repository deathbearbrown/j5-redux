'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
var App = require('./app/j5/dial-a-light');
var store = require('./app/store');
var board = new five.Board({
  io: new Tessel()
});
board.on("ready", function() {
  var app = new App();

  board.repl.inject({
    sensorState: function() {
      app.potentiometer.logStore();
    },
    leds: function() {
      return app.leds.leds;
    }
  });

});