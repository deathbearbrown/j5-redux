'use strict';
var five = require("johnny-five");
var App = require('./app/j5-apps/test-generic-input');

var board = new five.Board();

board.on("ready", function() {
  var app = new App();
});