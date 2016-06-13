'use strict';
var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});
board.on("ready", function() {
  // var red = new five.Button({
  //   pin: "a2"
  // });

  // var green = new five.Button({
  //   pin: "a3"
  // });

  // board.repl.inject({
  //   red: red,
  //   green: green
  // });

  // red.on("hold", function() {
  //   console.log( " RED Button held" );
  // });

  // red.on("press", function() {
  //   console.log( "RED Button pressed" );
  // });

  // red.on("release", function() {
  //   console.log( "RED Button released" );
  // });

  // green.on("hold", function() {
  //   console.log( "GREEN Button held" );
  // });

  // green.on("press", function() {
  //   console.log( "GREEN Button pressed" );
  // });

  // green.on("release", function() {
  //   console.log( "GREEN Button released" );
  // });
  var led = new five.Led("a2");
  // 7
  led.blink(500);

});