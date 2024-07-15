// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

let simpleStructure = {
   1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

let vowelBonusStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
};

/* function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let total = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
         total += Number(pointValue);
		 }
	  }
	}
	return letterPoints, total;
 } */

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

let simpleScorer = function(word){
   word = word.toUpperCase();
   let total = 0;
   for (let i = 0; i < word.length; i++){
      for (const pointValue in simpleStructure) {
         if (simpleStructure[pointValue].includes(word[i])) {
            total += Number(pointValue);
         }
       }
   }
   return total;
};

let vowelBonusScorer = function(word){
   word = word.toUpperCase();
   let total = 0;
   for (let i = 0; i < word.length; i++){
      for (let pointValue in vowelBonusStructure){
         if (vowelBonusStructure[pointValue].includes(word[i])){
            total += Number(pointValue);
         }
      }
   }
   return total;
};

let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let total = 0;
   for (let i = 0; i < word.length; i++){
      total += newPointStructure[word[i]];
      }
      return total;
   };

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt(word) {
   let scorer = input.question("Choose your scoring method.\n0 -- Simple: 1 point per letter \n1 -- Vowel bonus: 3 points for vowels \n2 -- Traditional: Uses Scrabble score system\nSelect number: ")
   return scoringAlgorithms[scorer].scorerFunction(word);
}

function transform(oldPointStructure) {
   let newObject = {};
   for (let pointValue in oldPointStructure) {
       for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
           newObject[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
       }
   }
   return newObject;
}

function runProgram() {
   let word = initialPrompt();
   let score = scorerPrompt(word);
   console.log(`Total score for ${word}: ${score}.`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
