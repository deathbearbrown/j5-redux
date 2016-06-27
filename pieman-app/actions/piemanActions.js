'use strict';
/**
 * J5 Actions for generically adding a j5 component to the "J5" redux store
 * Things like buttons and sensors will be maps under the 'J5s' object, and added dynamically
 *
 * Q: Should a user have more control over what their redux store is shaped like?
 */

function listening(on) {
  console.log(on);
  return {
    type: 'LISTENING_ON',
    on: on
  };
}

function resetGame() {
  return {
    type: 'RESET_GAME'
  };
}

function advanceRound() {
  return {
    type: 'ADVANCE_ROUND'
  };
}

function addPress() {
  return {
    type: 'ADD_PRESS'
  };
}

function resetPress() {
  return {
    type: 'RESET_PRESS'
  };
}

function setSequence(colors) {
  return {
    type: 'SET_SEQUENCE',
    sequence: colors
  };
}

module.exports = {
  reset: resetGame,
  listening: listening,
  advance: advanceRound,
  addPress: addPress,
  resetPress: resetPress,
  setSequence: setSequence
};