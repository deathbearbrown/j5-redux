'use strict';
module.exports = {
  // Generic Actions
  // Q: Is making a generic wrapper going to make this more confusing?

  // J5 --------------------------
  SET_J5: 'SET_J5',
  ADD_J5: 'ADD_J5',

  // Pieman -----------------
  RESET_GAME: 'RESET_GAME', // set sequence to [], buttonCount & round to 0
  ADVANCE_ROUND: 'ADVANCE_ROUND', // increate round by one
  ADD_PRESS: 'ADD_PRESS', // increase buttonCount by one
  RESET_PRESS: 'RESET_PRESS', // set buttonCount to 0
  SET_SEQUENCE: 'SET_SEQUENCE' // set sequence to an array of colors

};