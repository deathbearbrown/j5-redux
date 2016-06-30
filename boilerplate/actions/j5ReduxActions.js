'use strict';
/**
 * J5 Actions for generically adding a j5 component to the "J5" redux store
 * Things like buttons and sensors will be maps under the 'J5s' object, and added dynamically
 *
 * Q: Should a user have more control over what their redux store is shaped like?
 */


function setJ5Components(id, data, name) {
  return {
    type: 'SET_J5',
    id: id,
    name: name,
    data: data
  };
}

function addJ5Components(id, data, name) {
  return {
    type: 'ADD_J5',
    id: id,
    name: name,
    data: data
  };
}

module.exports = {
  setJ5Components: setJ5Components,
  addJ5Components: addJ5Components
};