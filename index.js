'use strict';
var five = require("johnny-five");
var App = require('./sample-project/test-generic-input');

var board = new five.Board();

board.on("ready", function() {
  var app = new App();
});