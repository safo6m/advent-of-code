// Puzzle:
//
// Santa is trying to deliver presents in a large apartment building,
// but he can't find the right floor - the directions he got are a little confusing.
// He starts on the ground floor (floor 0) and then follows the instructions one character at a time.
//
// An opening parenthesis, (, means he should go up one floor, and a closing parenthesis, ), means
// he should go down one floor.
//
// The apartment building is very tall, and the basement is very deep; he will never find the top or
// bottom floors.
//
// For example:
//
// (()) and ()() both result in floor 0.
// ((( and (()(()( both result in floor 3.
// ))((((( also results in floor 3.
// ()) and ))( both result in floor -1 (the first basement level).
// ))) and )())()) both result in floor -3.
// To what floor do the instructions take Santa?
//
// --- Part Two ---
//
// Now, given the same instructions, find the position of the first character that causes him to enter the
// basement (floor -1). The first character in the instructions has position 1, the second character has
// position 2, and so on.
//
// For example:
//
// ) causes him to enter the basement at character position 1.
// ()()) causes him to enter the basement at character position 5.
// What is the position of the character that causes Santa to first enter the basement?

((exports) => {
  'use strict';

  let floors = {
    // brackets - string of brackets
    // startingFloor  - number
    //                - optional
    //                - default: 0
    // returns floor number with Santa
    getCurrentFloor(brackets, startingFloor) {
      let currentFloor = startingFloor || 0;

      for(let bracket of brackets) {
        switch (bracket) {
          case '(':
            currentFloor ++;
            break;
          case ')':
            currentFloor --;
            break;
          default:
            console.log('Unexpected character: ' + bracket);
        }
      }

      return currentFloor;
    },

    // returns the position of the first bracket that caused santa's entering the basement
    getFirstTimeInTheBasement(brackets, startingFloor) {
      let currentFloor = startingFloor || 0;
      let step = 0;

      for(let bracket of brackets) {
        step ++;

        switch (bracket) {
          case '(':
            currentFloor ++;
            break;
          case ')':
            currentFloor --;
            break;
          default:
            console.log('Unexpected character: ' + bracket);
        }

        if (currentFloor < 0) {
          return step;
        }
      }

      return -1;
    }
  };


  exports.floors = floors;

})((typeof window === 'undefined') ? module.exports : window);
