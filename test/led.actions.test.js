'use strict';
var expect = require('chai').expect;
var actions = require('../app/actions/ledActions');
var types = require('../app/constants/actionTypes');

describe('actions', () => {
  it('should create an action to turn on an led', function() {
    var boolean = true;
    var expectedAction = {
      type: types.LED_ON,
      on: boolean
    }
    expect(actions.on(boolean)).to.eql(expectedAction);
  });
})