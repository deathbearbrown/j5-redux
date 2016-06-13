var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});
// 5
board.on("ready", function() {
  var led = new five.Led("a0");
  led.blink(500);
});