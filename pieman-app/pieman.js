'use strict';
var store = require('./store');
/*

Game play notes------

Game start
  - flash red
  - press red
    - flash red blue
    - press red blue
      - flash red blue blue
      - press red blue blue

  - flash red
  - press green
    - blink white (failure)


Have a sequence defined
seq = [red, blue, blue];
var i = 0;

i++ on each turn;

Output:
redux dispatch LED ON
loop through sequence and change color in redux;
redux dispatch LED off

Input:
bi = 0;
button press
bi++
listener - led color on
         - check bi vs sequence index max
         - check button id vs index
    id === game id
      - success (increase i++); run turn;
    id !== game id
      - fail, flash white



 */

// redux: game_light.rgb
// redux: game_buttons [red, yellow, green, blue]

var Pieman = function(){
  // redux cache for hooking up listeners ----
  this.state_cache = {};
  // j5 objects
  this.colors = ["red", "yellow", "green", "blue"];
  this.buttons = ["red", "yellow", "green", "blue"];

  // color sequence
  this.sequence = this.setupSequence(5);
  this.currentInt = 0;
};

Pieman.prototype.setupSequence = function(max) {
  var sequence =[];
  // add to the sequence and update expected
  for (var i = 0; max > i; i++){
    sequence.push(Math.floor(Math.random() *4));
  }
  return sequence;
};

Pieman.prototype.resetGame = function() {
  this.sequence = [1,2,3];
};

Pieman.prototype.startGame = function() {

};

Pieman.prototype.failGame = function() {
  // set to white blink ---
};



// store listener ---------------
Pieman.prototype.buttonPressed = function(id){
  if (this.buttons[id].index() !== this.currentInt){
    this.failGame();
  } else if (this.sequence.length < this.currentInt++) {
    this.winGame();
  } else {
    this.currentInt++;
  }
}

module.exports = Pieman;