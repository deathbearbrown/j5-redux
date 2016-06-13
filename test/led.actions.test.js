var expect = require('chai').expect;
import * as actions from '../app/actions/ledActions'
import types from '../app/constants/actionTypes'

describe('actions', () => {
  it('should create an action to turn on an led', () => {
    const boolean = true;
    const expectedAction = {
      type: types.LED_ON,
      boolean
    }
    expect(actions.on(boolean)).to.eql(expectedAction)
  })
})