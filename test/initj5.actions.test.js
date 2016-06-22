'use strict';
require('./bootstrap');
var actions = require('../sample-project/actions/initJ5Actions');
var types = require('../sample-project/constants/actionTypes');

describe('initJ5 actions', () => {
  it('should create an action to change state of an initJ5', function() {
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

  it('should create an action to add an initJ5', function() {
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
