'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
var App = require('./app/j5/dial-a-bright');
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", function() {
  var app = new App();
});