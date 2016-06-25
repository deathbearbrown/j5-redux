// Unlocks useful features in Johnny-Five
process.env.IS_TEST_MODE = true;

// Third Party Deps
global.expect = require("chai").expect;
global.mocks = require("mock-firmata");

global.MockFirmata = mocks.Firmata;
global.MockSerialPort = mocks.SerialPort;

global.sinon = require("sinon");
global.five = require("johnny-five");

global.Board = five.Board;
global.Led = five.Led;
global.Sensor = five.Sensor;


function newBoard(pins) {

  if (pins) {
    pins.forEach(function(pin) {
      Object.assign(pin, {
        mode: 1,
        value: 0,
        report: 1,
        analogChannel: 127
      });
    });
  }

  var io = new MockFirmata({
    pins: pins
  });

  io.SERIAL_PORT_IDs.DEFAULT = 0x08;

  var board = new Board({
    io: io,
    debug: false,
    repl: false
  });

  io.emit("connect");
  io.emit("ready");

  return board;
}

global.sandbox = sinon.sandbox.create();

function cleanup() {
  Board.purge();
  sandbox.restore();
}


global.newBoard = newBoard;
global.cleanup = cleanup;


// Internal/Module Deps
//
// global.initJ5 = require("../boilerplate/util/initJ5");