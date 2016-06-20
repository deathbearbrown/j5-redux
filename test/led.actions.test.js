// 'use strict';
// require('./bootstrap');
// var actions = require('../app/actions/ledActions');
// var types = require('../app/constants/actionTypes');

// describe('led actions', () => {
//   it('should create an action to turn on an led', function() {
//     var on = false;
//     var id = 'gremlins';
//     var expectedAction = {
//       type: types.ON_LED,
//       on: on,
//       id: id
//     }
//     expect(actions.on({id:id, on:on})).to.eql(expectedAction);
//   });

//   it('should create an action to add an led', function() {
//     var pin = 'l33t';
//     var store_key = 'gremlins';

//     var expectedAction = {
//       type: types.ADD_LED,
//       pin: 'l33t',
//       id: 'gremlins'
//     }

//     expect(actions.addLed({store_key: store_key, pin: pin})).to.eql(expectedAction);
//   });
// })
