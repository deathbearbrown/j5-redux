'use strict';
function setSensor(level) {
  return {
    type: 'SET_SENSOR',
    level: level
  };
}

module.exports = setSensor;