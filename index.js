'use strict';
var five = require("johnny-five");
var Pieman = require('./pieman-app');
var Store = require('./pieman-app/store');
var board = new five.Board();

/**
 * This is the code that is run on the board
 * It's running a memory game called "Pieman", which is Simon without the sound
 */

board.on("ready", function() {
 var app = new Pieman();

 // Passing Store into repl is helpful for troubleshooting what is getting into redux
 // Your best friend for writing software for hardware is writing tests.
 // You can see if your code is working without ever uploading to the board.
 // See the test folder for how to test an app using johnny-five :)

 this.repl.inject({
  store: Store
 });

});