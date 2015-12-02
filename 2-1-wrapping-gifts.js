((exports) => {
  'use strict';

  let elves = {
    parseGift(gift) {
      let sides = gift.split('x');
      sides = sides.map((item) => {
        return parseInt(item, 10);
      });

      return sides;
    },

    sortGiftSides(sides) {
      return sides.sort((item1, item2) => item1 > item2);
    },

    // gifts - array of string, ie. ['11x9x29', '1x2x3']
    calculateAmountOfPaper(gifts) {
      let totalPaper = 0;

      for (let gift of gifts) {
        let sides = this.parseGift(gift);
        totalPaper += this.getPaperAmountForOneGift(sides);
      }

      return totalPaper;
    },

    getPaperAmountForOneGift(sides) {
      sides = [sides[0] * sides[1], sides[0] * sides[2], sides[1] * sides[2]];
      sides = this.sortGiftSides(sides);
      sides.unshift(sides[0]);

      let total = sides.reduce((previousValue, currentValue, currentIndex) => {
        currentValue = currentIndex ? 2 * currentValue : currentValue;
        return previousValue + currentValue;
      }, 0);

      return total;
    },

    // gifts - array of string, ie. ['11x9x29', '1x2x3']
    calculateLengthOfRibbon(gifts) {
      let totalLength = 0;

      for (let gift of gifts) {
        let sides = this.parseGift(gift);
        totalLength += this.getRibbonLengthForOneGift(sides);
      }

      return totalLength;
    },

    getRibbonLengthForOneGift(sides) {
      sides = this.sortGiftSides(sides);

      let theSmallestPerimeter = 2 * sides[0] + 2 * sides[1];
      let volume = sides[0] * sides[1] * sides[2];

      return theSmallestPerimeter + volume;
    }
  };


  exports.elves = elves;

})((typeof window === 'undefined') ? module.exports : window);
