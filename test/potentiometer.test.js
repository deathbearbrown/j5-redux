'use strict';
require('./bootstrap');
var Potentiometer = require('../app/j5/potentiometer');

describe('Potentiometer class', () => {
  var potentiometer;
  var board;

  beforeEach(function() {
    board = newBoard();
    potentiometer = new Potentiometer("a4", 2050, board);
  });

  it('has a j5 potentiometer module', function(){
    expect(potentiometer).to.have.property('potentiometer');
    expect(potentiometer.potentiometer).to.be.an.instanceof(five.Sensor);
  });

});
