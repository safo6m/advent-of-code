// --- Day 3: Perfectly Spherical Houses in a Vacuum ---
//
// Santa is delivering presents to an infinite two-dimensional grid of houses.
//
// He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.
//
// However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?
//
// For example:
//
// > delivers presents to 2 houses: one at the starting location, and one to the east.
// ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
// ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
// --- Part Two ---
//
// The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.
//
// Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.
//
// This year, how many houses receive at least one present?
//
// For example:
//
// ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
// ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
// ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.


((exports) => {
  'use strict';

  let delivery = {
    field: undefined,
    houses: undefined,

    initialize(route) {
      this.houses = this.nextHouseGenerator(route);
      this.field = {};
    },

    nextHouseGenerator: function* (route) {
      for (let house of route) {
        yield house;
      }
    },

    simulateSantaDelivering() {
      let currentPosition = {
        x: 0,
        y: 0
      };

      this.setFieldPosition(currentPosition);

      while(true) {
        let direction = this.houses.next().value;
        if (!direction) {
          break;
        }
        currentPosition = this.move(currentPosition, direction);

        this.setFieldPosition(currentPosition);
      }
    },

    simulateRoboSantaDelivering() {
      let currentSantaPosition = {
        x: 0,
        y: 0
      };

      let currentRoboPosition = {
        x: 0,
        y: 0
      };

      this.setFieldPosition(currentSantaPosition);
      this.setFieldPosition(currentRoboPosition);

      while(true) {
        let directionSanta = this.houses.next().value;
        if (!directionSanta) {
          break;
        }
        currentSantaPosition = this.move(currentSantaPosition, directionSanta);
        this.setFieldPosition(currentSantaPosition);

        let directionRobo = this.houses.next().value;
        if (!directionRobo) {
          break;
        }
        currentRoboPosition = this.move(currentRoboPosition, directionRobo);
        this.setFieldPosition(currentRoboPosition);
      }
    },

    move(currentPosition, direction) {
      switch (direction) {
        case '>':
          currentPosition.x ++;
          break;
        case '<':
          currentPosition.x --;
          break;
        case '^':
          currentPosition.y ++;
          break;
        case 'v':
          currentPosition.y --;
          break;
        default:
          console.log('Unxepected character.');
      }

      return currentPosition;
    },

    setFieldPosition(location) {
      this.field[location.x] = this.field[location.x]  || {};
      this.field[location.x][location.y] = this.field[location.x][location.y] ?  this.field[location.x][location.y] + 1 : 1;
    },

    getFieldValue(location) {
      this.field[location.x] = this.field[location.x] || {};
      let value = this.field[location.x][location.y] ? this.field[location.x][location.y] : 0;
    },

    // params: {
    //   giftetMoreThan
    //   giftetLessThan
    // }
    getNumberOfGiftetHouses(params) {
      params = params || {};
      let counter = 0;

      for (let houseX of Object.keys(this.field)) {
        for (let houseY of Object.keys(this.field[houseX])) {
          if (params.giftetMoreThan && params.giftetLessThan) {
            counter += (houseY > params.giftetMoreThan && houseY < params.giftetLessThan) ? 1 : 0;
          } else if (params.giftetMoreThan) {
            counter += (houseY > params.giftetMoreThan) ? 1 : 0;
          } else if (params.giftetLessThan) {
            counter += (houseY < params.giftetLessThan) ? 1 : 0;
          } else {
            counter ++;
          }
        }
      }

      return counter;
    },

    getResultForPart1(input) {
      this.initialize(input);
      this.simulateSantaDelivering();
      return this.getNumberOfGiftetHouses();
    },

    getResultForPart2(input) {
      this.initialize(input);
      this.simulateRoboSantaDelivering();
      return this.getNumberOfGiftetHouses();
    }
  };


  exports.delivery = delivery;

})((typeof window === 'undefined') ? module.exports : window);
