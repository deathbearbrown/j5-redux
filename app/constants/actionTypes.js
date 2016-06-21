'use strict';
module.exports = {
  // Explicit Actions
  // Q: Should the store be designed around the app vs what j5 input/output hardware you use?

  // LEDs ----------
  ADD_LED: 'ADD_LED',
  SET_LED: 'SET_LED',

  // On Switch----
  ON_SWITCH: 'ON_SWITCH',

  // Button ----
  ADD_BUTTON: 'ADD_BUTTON',
  SET_BUTTON: 'SET_BUTTON',

  // Sensors ----
  SET_SENSOR: 'SET_SENSOR',


  // Generic Actions
  // Q: Is making a generic wrapper going to make this more confusing?

  // INPUTS --------------------------
  SET_INPUT: 'SET_INPUT',
  ADD_INPUT: 'ADD_INPUT',

  // OUTPUTS
  SET_OUTPUT: 'SET_INPUT',
  ADD_INPUT: 'ADD_INPUT'

};