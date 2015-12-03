// --- Day 2: I Was Told There Would Be No Math ---
//
// The elves are running low on wrapping paper, and so they need to submit an order for more. They have a list of the dimensions (length l, width w, and height h) of each present, and only want to order exactly as much as they need.
//
// Fortunately, every present is a box (a perfect right rectangular prism), which makes calculating the required wrapping paper for each gift a little easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l. The elves also need a little extra paper for each present: the area of the smallest side.
//
// For example:
//
// A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6 square feet of slack, for a total of 58 square feet.
// A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper plus 1 square foot of slack, for a total of 43 square feet.
// All numbers in the elves' list are in feet. How many total square feet of wrapping paper should they order?
//
// --- Part Two ---
//
// The elves are also running low on ribbon. Ribbon is all the same width, so they only have to worry about the length they need to order, which they would again like to be exact.
//
// The ribbon required to wrap a present is the shortest distance around its sides, or the smallest perimeter of any one face. Each present also requires a bow made out of ribbon as well; the feet of ribbon required for the perfect bow is equal to the cubic feet of volume of the present. Don't ask how they tie the bow, though; they'll never tell.
//
// For example:
//
// A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon to wrap the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34 feet.
// A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon to wrap the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14 feet.
// How many total feet of ribbon should they order?


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
