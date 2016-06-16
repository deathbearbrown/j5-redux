'use strict';
function playTone(data) {
  var tones = {
    A: false,
    B: false,
    C: false,
    D: false
  };
  tones[data.tone] = true;
  return {
    type: 'PLAY_TONE',
    id: data.id,
    tones: tone
  };
}

function addPiezo(data) {
  return {
    type: 'ADD_PIEZO',
    pin: data.pin,
    id: data.store_key
  };
}

module.exports = {
  playTone: playTone,
  addPiezo: addPiezo
};