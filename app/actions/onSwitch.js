'use strict';
function on(bool) {
  return {
    type: 'ON_SWITCH',
    status: bool
  };
}

module.exports = on;