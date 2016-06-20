'use strict';
function onBlink(data) {
  return {
    type: 'SET_LED',
    id: data.id,
    on: data.on || false,
    blink: data.blink || false
  };
}

function addLed(data) {
  return {
    type: 'ADD_LED',
    pin: data.pin,
    id: data.id
  };
}

function setBrightness(data){
  return {
    type: 'SET_LED',
    id: data.id,
    on: false,
    blink: false,
    brightness: data.brightness
  };
}

module.exports = {
  on: onBlink,
  blink: onBlink,
  addLed: addLed,
  setBrightness: setBrightness
};