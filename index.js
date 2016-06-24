'use strict';
var five = require("johnny-five");
//var App = require('./sample-project/test-generic-input');
var App = require('./sample-project/RGBLED');
var Store = require('./sample-project/store');

var board = new five.Board();

board.on("ready", function() {
 var app = new App();

 this.repl.inject({
  store: Store
 });
});