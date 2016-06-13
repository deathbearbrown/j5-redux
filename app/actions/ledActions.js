'use strict';
function on(boolean) {
  return {
    type: 'LED_ON',
    on: boolean
  };
}

module.exports = {
  on: on
};