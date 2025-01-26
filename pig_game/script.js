/***********************
 * Author: Md Abul Kalam
 * Topic: PiG game using DOM manipulation technique of pure Vanila JS
 ************************/
'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
// let scores = [0, 0]; //this is for main score

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRollDice.addEventListener('click', function () {
  if (playing) {
    //generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    //display dice roll
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');
    if (diceRoll == 1) {
      //switch player
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    let playerEl;
    let scoreEl;

    if (activePlayer === 0) {
      scoreEl = score0El;
      playerEl = player0El;
    } else {
      scoreEl = score1El;
      playerEl = player1El;
    }

    //this is bad idea becuase user can modify it from dom so we need to keep the main score in a score[] array so that we can get from variable instead of dom
    let playerTotalScore = Number(scoreEl.textContent) + currentScore;
    scoreEl.textContent = playerTotalScore;
    if (playerTotalScore >= 100) {
      playing = false;
      playerEl.classList.add('player--winner');
    }
    //switch player
    switchPlayer();
  }
});

btnNewGame.addEventListener('click', function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  if (player1El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }

  player0El.classList.contains('player--winner')
    ? player0El.classList.remove('player--winner')
    : '';
  player1El.classList.contains('player--winner')
    ? player1El.classList.remove('player--winner')
    : '';

  // diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
});
