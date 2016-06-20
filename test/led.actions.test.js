'use strict';
require('./bootstrap');
var actions = require('../app/actions/ledActions');
var types = require('../app/constants/actionTypes');

describe('led actions', () => {
  it('should create an action to change state of an led', function() {
    var on = false;
    var id = 'gremlins';
    var expectedAction = {
      type: types.SET_LED,
      on: on,
      id: id,
      blink: false
    };
    expect(actions.on({id:id, on:on})).to.eql(expectedAction);
  });

  it('should create an action to add an led', function() {
    var pin = 'l33t';
    var id = 'gremlins';
    var expectedAction = {
      type: types.ADD_LED,
      pin: 'l33t',
      id: 'gremlins'
    };

    expect(actions.addLed({id:id, pin:pin})).to.eql(expectedAction);
  });

  it('should set brightness', function() {
    var pin = 'l33t';
    var id = 'gremlins';
    var brightness = 123;

    var expectedAction = {
      type: types.SET_LED,
      id: id,
      on: false,
      blink: false,
      brightness: brightness
    };

    expect(actions.setBrightness({id:id, pin:pin, brightness: brightness})).to.eql(expectedAction);
  });


});
