'use strict';
function on(data) {
  return {
    type: 'ON_LED',
    id: data.id,
    on: data.on
  };
}

function addLed(data) {
  return {
    type: 'ADD_LED',
    pin: data.pin,
    id: data.store_key
  };
}

module.exports = {
  on: on,
  addLed: addLed
};