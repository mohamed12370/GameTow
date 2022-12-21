'use strict';

// selecting element
const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const player0 = document.getElementById('player-0');
const player1 = document.getElementById('player-1');
const scorePlayer0 = document.getElementById('score-player0');
const scorePlayer1 = document.getElementById('score-player1');

const diceEl = document.getElementById('dice');
const diceImg = document.querySelector('#dice img');

const btnNew = document.querySelector('.new');
const btnRoll = document.querySelector('.nard');
const btnHold = document.querySelector('.hold');

// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let playing = true;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceImg.setAttribute('src', `${diceNum}.jpg`);

    // 3. check for rolled 1: if true, switch to next player
    if (diceNum !== 1) {
      currentScore += diceNum;
      //scorePlayer0.textContent = currentScore;
      if (!player1.classList.contains('check')) {
        scorePlayer1.textContent = currentScore;
      } else {
        scorePlayer0.textContent = currentScore;
      }
    } else {
      if (player1.classList.contains('check')) {
        console.log('player1');
        player1.classList.remove('check');
        player0.classList.add('check');
        currentScore = 0;
        scorePlayer0.textContent = 0;
      } else {
        console.log('player0');
        player0.classList.remove('check');
        player1.classList.add('check');
        currentScore = 0;
        scorePlayer1.textContent = 0;
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current to active player's score
    if (!player1.classList.contains('check')) {
      score1El.textContent = +score1El.textContent + currentScore;
      currentScore = 0;
      scorePlayer1.textContent = 0;
      player1.classList.add('check');
      player0.classList.remove('check');
    } else {
      score0El.textContent = +score0El.textContent + currentScore;
      currentScore = 0;
      scorePlayer0.textContent = 0;
      player0.classList.add('check');
      player1.classList.remove('check');
    }
    // 2. check if player's score is >= 100
    if (Number(score1El.textContent) >= 100) {
      player1.classList.remove('check');
      player1.classList.add('winner');
      player0.classList.add('check');
      playing = false;
      diceEl.classList.add('hidden');
    } else if (Number(score0El.textContent) >= 100) {
      player0.classList.remove('check');
      player0.classList.add('winner');
      player1.classList.add('check');
      playing = false;
      diceEl.classList.add('hidden');
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('winner');
  player1.classList.remove('winner');
  player1.classList.add('check');
  player0.classList.remove('check');
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
});
