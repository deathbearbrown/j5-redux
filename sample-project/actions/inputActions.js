'use strict';
/**
 * Input Actions for generically adding a j5 input module to the "inputs" redux store
 * Things like buttons and sensors will be maps under the 'Inputs' object, and added dynamically
 *
 * Q: Should a user have more control over what their redux store is shaped like?
 */


function setInputComponents(id, data, name) {
  return {
    type: 'SET_INPUT',
    id: id,
    name: name,
    data: data
  };
}

function addInputComponents(id, data, name) {
  return {
    type: 'ADD_INPUT',
    id: id,
    name: name,
    data: data
  };
}

module.exports = {
  setInputComponents: setInputComponents,
  addInputComponents: addInputComponents
};