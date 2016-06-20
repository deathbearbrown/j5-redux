'use strict';
require('./bootstrap');
var Sensor = require('../app/j5-modules/sensor');

describe('Sensor class', () => {
  var sensor;
  var board;

  beforeEach(function() {
    board = newBoard();
    sensor = new Sensor("a4", 2050, board);
  });

  it('has a j5 sensor module', function(){
    expect(sensor).to.have.property('sensor');
    expect(sensor.sensor).to.be.an.instanceof(five.Sensor);
  });

});
