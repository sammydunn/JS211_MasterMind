'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = () =>  {
  // your code here
  let hints = 0;
  let hints2 = 0;

  let Garray = guess.split('');
  let solution = solution.split('');
   Garray.forEach(function(letter, index){
      if(Garray[index] == solution[index]){
      hints++
      Garray[index] = 0
      solution[index] = 1
   }
  })
Garray.forEach(function(guessLetter, guessIndex){
   solution.forEach(function(solutionLetter, solutionIndex){
    if(guessLetter == solutionLetter){
        hints2++
        Garray[guessIndex] = 0
        solution[solutionIndex] = 1
  }
  })
  })
  return hints + "-" + hints2
}

const mastermind = (guess) => {
  solution = 'abcd';
  if(guess === solution){
    board = [];
    return 'Correct'
  } else if (board.length >= 10) {
    console.log('LOST');
    board = [];
    solution = '';
    generateSolution()
  } else {
    board.push(guess)
    console.log(generateHint(guess))
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}