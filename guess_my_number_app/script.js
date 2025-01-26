/***********************
 * Author: Md Abul Kalam
 * Topic: Gues My Number using Vanila JS DOM manipulation
 ************************/
'use strict';

//practice some dom manipulation using vanila js

// console.log(document.querySelector('.message').textContent);
// console.log((document.querySelector('.guess').value = 20));

let secretNumber = Math.trunc(Math.random() * 19) + 1;
// document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highestScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  // annonymous function -> javascript engine will call the function as soon as the event is happend
  const guessNumber = Number(document.querySelector('.guess').value);
  if (!guessNumber) {
    displayMessage('No number enter!');
  } else {
    if (score > 0) {
      score--;
      document.querySelector('.score').textContent = score;

      if (secretNumber == guessNumber) {
        if (highestScore < score) {
          highestScore = score;
        }
        document.querySelector('body').style.backgroundColor = '#76da69';
        document.querySelector('.highscore').textContent = highestScore;
        displayMessage('Correct Number!');
      } else if (guessNumber != secretNumber) {
        displayMessage(
          guessNumber > secretNumber
            ? 'To high! Please try again'
            : 'To low! Please try again'
        );
      }
    } else {
      displayMessage('Game Over!');
      document.querySelector('body').style.backgroundColor = 'red';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  displayMessage('Start guessing...');
  secretNumber = Math.trunc(Math.random() * 19) + 1;
  // document.querySelector('.number').textContent = secretNumber;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
});
