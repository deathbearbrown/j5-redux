'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
//var App = require('./app/j5/dial-a-light');
var App = require('./app/j5/button-light');
var store = require('./app/store');
var board = new five.Board({
  io: new Tessel()
});
board.on("ready", function() {
  var app = new App();

  board.repl.inject({
    store: function() {
      console.log(store.getState('buttons'));
    }
  });

});