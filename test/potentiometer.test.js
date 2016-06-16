'use strict';
var expect = require('chai').expect;
var five = require('johnny-five');
var Potentiometer = require('../app/j5/potentiometer');

describe('Potentiometer class', () => {
  var potentiometer;
  beforeEach(function() {
    var board = new five.Board();
    potentiometer = new Potentiometer("a4", 2050, board);
  });

  it('has a j5 potentiometer module', function(){
    expect(potentiometer).to.have.property('potentiometer');
    expect(potentiometer.potentiometer).to.be.an.instanceof(five.Sensor);
  });

});