'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
var Pieman = require('./pieman-app/Game');
var Store = require('./pieman-app/store');

/**
 * On board ready it runs the game code located in 'pieman-app'
 * It's running a memory game called "Pieman", which is Simon without the sound
 */

var board = new five.Board({
  io: new Tessel()
});

board.on("ready", function() {
  var app = new Pieman();

  // Passing Store into repl is helpful for troubleshooting what is getting into redux
  // Your bestfriend for writing software for hardware is writing tests.
  // You can see if your code is working without ever uploading to the board.
  // See the test folder for how to test an app using johnny-five :)

  this.repl.inject({
    store: Store.getState()
  });

});