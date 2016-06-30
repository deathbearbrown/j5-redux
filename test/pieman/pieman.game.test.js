// "use strict";
// require("./bootstrap");
// var Game = require("../pieman-app/Game");
// var store = require('../pieman-app/store');
// var five = require('johnny-five');

// describe("Game", () => {
//   var game;
//   var board;
//   var stubs = {};
//   var spies = {};

//   beforeEach(function() {
//     board = newBoard();
//     spies.Button = sandbox.spy(five, "Button");
//     spies.Led = sandbox.spy(five.Led, "RGB");
//     //game = new Game();

//   });

//   afterEach(function() {
//     cleanup();
//   });

//   it("Game rounds default to 10", function() {
//     expect(game).to.have.property('rounds');
//     expect(game.rounds).to.equal(10);
//   });

//   it("Initializes 1 RGB led", function() {
//     expect(spies.Led.callCount).to.equal(1);
//   });

//   it("Initializes 4 buttons", function(){
//     expect(spies.Button.callCount).to.equal(4);
//   });

//   it("Has a sequence property, that is an array, length 10", function(){
//     expect(game).to.have.property('sequence');
//     expect(game.sequence).to.be.a('array');
//     expect(game.sequence.length).to.equal(10);
//   });

//   it("Has subscribed to round", function(){
//     expect(game).to.have.property('unsubscribe');
//   });

//   it("setSequence creates an array of color names", function(){
//     var colors = game.setSequence(2);
//     expect(colors.length).to.equal(2);
//   });

// });
