'use strict';
var expect = require('chai').expect;
var actions = require('../app/actions/ledActions');
var types = require('../app/constants/actionTypes');

describe('actions', () => {
  it('should create an action to turn on an led', function() {
    var on = false;
    var id = 'gremlins';
    var expectedAction = {
      type: types.LED_ON,
      on: boolean,
      id: id
    }
    expect(actions.on({id:id, on:on})).to.eql(expectedAction);
  });

  it('should create an action to add an led', function() {
    var pin = 'l33t';
    var store_key = 'gremlins';
    var expectedAction = {
      type: types.ADD_LED,
      pin: pin
      id: store_key
    }
    expect(actions.on({store_key:id, pin:pin})).to.eql(expectedAction);
  });
})