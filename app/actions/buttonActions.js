'use strict';
function setButton(data) {
  return {
    type: 'SET_BUTTON',
    id: data.id,
    status: data.status
  };
}

function addButton(data) {
  return {
    type: 'ADD_BUTTON',
    pin: data.pin,
    id: data.store_key
  };
}

module.exports = {
  setButton: setButton,
  addButton: addButton
};