'use strict';
require('./bootstrap');
var action = require('../app/actions/setSensor');
var types = require('../app/constants/actionTypes');

describe('set sensor', () => {
  it('should create an action to set sensor level', function() {
    var level = 400;
    var expectedAction = {
      type: types.SET_SENSOR,
      level: level
    };
    expect(action(level)).to.eql(expectedAction);
  });

})
