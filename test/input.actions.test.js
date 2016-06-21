'use strict';
require('./bootstrap');
var actions = require('../sample-project/actions/inputActions');
var types = require('../sample-project/constants/actionTypes');

describe('input actions', () => {
  it('should create an action to change state of an input', function() {
    var id = 'gremlins';
    var data = {
          id: 'cool',
          pin: "A2",
          freq: 250
        };
    var name = 'bears';

    var expectedAction = {
      type: 'SET_INPUT',
      id: id,
      name: name,
      data: data
    };

    expect(actions.setInputComponents(id, data, name)).to.eql(expectedAction);
  });

  it('should create an action to add an input', function() {
    var id = 'gremlins';
    var data = {
          id: 'cool',
          pin: "A2",
          freq: 250
        };
    var name = 'bears';

    var expectedAction = {
      type: 'ADD_INPUT',
      id: id,
      name: name,
      data: data
    };

    expect(actions.addInputComponents(id, data, name)).to.eql(expectedAction);
  });

});
