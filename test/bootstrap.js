
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
  var io = new MockFirmata({
    pins: [
      // Port A
      { supportedModes: [0, 1, 6], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 6], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1 ], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1 ], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 ], analogChannel: 0, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 3, 4, 10 ], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 3, 4, 10 ], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 ], analogChannel: 1, mode: 0, report: 0, value: 0 },
      // Port B
      { supportedModes: [0, 1, 2 , 6], analogChannel: 2, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 , 6], analogChannel: 3, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 ], analogChannel: 4, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 ], analogChannel: 5, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2 ], analogChannel: 6, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2, 3, 4, 10 ], analogChannel: 7, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2, 3, 4, 10 ], analogChannel: 8, mode: 0, report: 0, value: 0 },
      { supportedModes: [0, 1, 2, 3 ], analogChannel: 9, mode: 0, report: 0, value: 0 },
      // LEDs
      { supportedModes: [1], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [1], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [1], analogChannel: 127, mode: 0, report: 0, value: 0 },
      { supportedModes: [1], analogChannel: 127, mode: 0, report: 0, value: 0 },
    ]
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
// global.j5Redux = require("../boilerplate/util/j5Redux");