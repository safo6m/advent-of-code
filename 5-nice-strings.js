// Santa needs help figuring out which strings in his text file are naughty or nice.
//
// A nice string is one with all of the following properties:
//
// It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
// It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
// It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
// For example:
//
// ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
// aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
// jchzalrnumimnmhp is naughty because it has no double letter.
// haegwjzuvuyypxyu is naughty because it contains the string xy.
// dvszwmarrgswjxmb is naughty because it contains only one vowel.
// How many strings are nice?
//
// Your puzzle answer was 258.
//
// --- Part Two ---
//
// Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.
//
// Now, a nice string is one with all of the following properties:
//
// It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
// It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
// For example:
//
// qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
// xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
// uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
// ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
// How many strings are nice under these new rules?


((exports) => {
  'use strict';

  let niceStrings = {
    naughtyStrings: ['ab', 'cd', 'pq', 'xy'],
    vowels: ['a', 'e', 'i', 'o', 'u'],

    initialize(strs) {
      this.strings = this.stringGenerator(strs);
    },

    stringGenerator: function* (strings) {
      for (let str of strings) {
        yield str;
      }
    },

    getNumberOfVowels(str) {
      let chars = str.split('');

      let vows = chars.filter((c) => {
        return this.vowels.indexOf(c) !== -1;
      })

      return vows.length;
    },

    containsNaughyStrings(str) {
      let naughtyStrings = this.naughtyStrings.filter((naughtyString) => {
        return str.indexOf(naughtyString) !== -1;
      })

      return !!naughtyStrings.length;
    },

    containsGroupsOfTheSameLetter(str) {
      for(let i = 1; i < str.length; i++) {
        if (str[i] === str[i-1]) {
          return true;
        }
      }

      return false;
    },

    containsLetterWhichRepeats(str) {
      for(let i = 2; i < str.length; i++) {
        if (str[i-2] === str[i]) {
          return true;
        }
      }

      return false
    },

    containsDuplicatePairOfLetters(str){
      let pairs = {};

      let i = 1;
      let previousPair;
      while (i < str.length) {
        let pair = str[i-1] + str[i];

        if (previousPair === pair) {
          previousPair = undefined;
        } else {
          pairs[pair] = pairs[pair] ? pairs[pair] + 1 : 1;
          previousPair = pair;
        }

        i++;
      }

      for (var pair in pairs) {
        if (pairs[pair] > 1) {
          return true;
        }
      }

      return false;
    },

    isStringNice(str) {
      let strContainsNaughtStrings = this.containsNaughyStrings(str);
      let strCountainsDuplicates = this.containsGroupsOfTheSameLetter(str);
      let numberOfVowels = this.getNumberOfVowels(str);

      return (!strContainsNaughtStrings && strCountainsDuplicates && numberOfVowels >= 3);
    },

    isStringNiceVersion2(str) {
      let strHasRepeatingLetter = this.containsLetterWhichRepeats(str);
      let strHasDuplicatePair = this.containsDuplicatePairOfLetters(str);

      return (strHasRepeatingLetter && strHasDuplicatePair);
    },

    getNumberOfNiceStrings(version2) {
      let niceCounter = 0;

      while(true) {
        let str = this.strings.next().value;

        if (!str) {
          break
        }

        if (version2) {
          niceCounter += this.isStringNiceVersion2(str) ? 1 : 0;
        } else {
          niceCounter += this.isStringNice(str) ? 1 : 0;
        }
      }

      return niceCounter;
    },

    getResultForPart1(input) {
      this.initialize(input);
      let niceStrings = this.getNumberOfNiceStrings();
      console.log('Number of nice strings: ', niceStrings);
    },

    getResultForPart2(input) {
      this.initialize(input);
      let niceStrings = this.getNumberOfNiceStrings(true);
      console.log('Number of nice strings: ', niceStrings);
    }
  };


  exports.niceStrings = niceStrings;

})((typeof window === 'undefined') ? module.exports : window);
