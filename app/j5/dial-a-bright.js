'use strict';
var store = require('../store');
var setBrightness = require('../actions/ledActions').setBrightness;
var Potentiometer = require('./potentiometer');
var Light = require('./light');


var DialABright = function() {
  this.state = {
    sensors: null
  };

  this.potentiometer = new Potentiometer('a4', 2050);
  this.leds = new Light([
    {
      store_key: 'red',
      pin: 'a6'
    }
  ]);

  // subscribe to sensor
  this.unsubscribeSensor = store.subscribe(this.sensorListenerEvents.bind(this));
  this.sensorListenerEvents();

  return this;
};

DialABright.prototype.getSensorState = function(state) {
  return state.sensor.level;
};

DialABright.prototype.brightness = function(sensor){
 return Math.round((sensor * 255)/1025);
};

DialABright.prototype.sensorListenerEvents = function() {
  var previousValue = this.state.sensors;
  this.state.sensors = this.getSensorState(store.getState());

  if (previousValue !== this.state.sensors) {
    var sensors = this.state.sensors;
    if (sensors > 10) {
      store.dispatch(setBrightness({id: 'red', brightness: this.brightness(sensors)}));
    }
  }
};

module.exports = DialABright;
