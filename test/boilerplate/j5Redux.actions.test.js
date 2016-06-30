'use strict';
require('../bootstrap');
var actions = require('../../boilerplate/actions/j5ReduxActions');
var types = require('../../boilerplate/constants/actionTypes');

describe('j5Redux actions', () => {
  it('should create an action to change state of an j5Redux', function() {
    var id = 'gremlins';
    var data = {
          id: 'cool',
          pin: "A2",
          freq: 250
        };
    var name = 'bears';

    var expectedAction = {
      type: 'SET_J5',
      id: id,
      name: name,
      data: data
    };

    expect(actions.setJ5Components(id, data, name)).to.eql(expectedAction);
  });

  it('should create an action to add an j5Redux', function() {
    var id = 'gremlins';
    var data = {
          id: 'cool',
          pin: "A2",
          freq: 250
        };
    var name = 'bears';

    var expectedAction = {
      type: 'ADD_J5',
      id: id,
      name: name,
      data: data
    };

    expect(actions.addJ5Components(id, data, name)).to.eql(expectedAction);
  });

});
