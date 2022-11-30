'use strict';

let randomNumber = getRandom();
let score = 20;
let highScore = 0;
let isGameOver = false;

//#region [ Utilities ]
function getRandom() {
  let rand = Math.floor(Math.random() * 20) + 1;
  document.querySelector('title').textContent = rand;
  console.log(rand);
  return rand;
}

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayHighscore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};
//#endregion

//#region [ OnCheck Button Functions ]
document.querySelector('.check').addEventListener('click', checkNumber);

function checkNumber() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, randomNumber);
  if (guess && guess >= 1 && guess <= 20) {
    if (guess !== randomNumber) {
      onFalseAnswer(guess, randomNumber);
    } else {
      onCorrectAnswer();
    }
  } else {
    onWrongInput();
  }
}

function onCorrectAnswer() {
  displayMessage('😎 You Found It!');
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.number').textContent = randomNumber;

  if (score > highScore) {
    highScore = score;
    displayHighscore(highScore);
  }
}

function onFalseAnswer(guess, randomNumber) {
  if (!isGameOver) {
    checkScore();
    displayMessage(guess < randomNumber ? '😂 Too Low!!' : '😁 Too High!!');
  }
  if (score <= 0) {
    onGameOver();
  }
}

function onGameOver() {
  document.querySelector('body').style.backgroundColor = '#ff0000';
  displayMessage('🤣 YOU LOST!!');
}

function onWrongInput() {
  checkScore();
  displayMessage('👀 Enter a number between 1 and 20..');
}

function checkScore() {
  if (score > 0) {
    score--;
    displayScore(score);
    isGameOver = false;
  } else isGameOver = true;
}
//#endregion

//#region [ OnRestart Button Functions ]
document.querySelector('.again').addEventListener('click', onGameRestart);

function onGameRestart() {
  document.querySelector('body').style.backgroundColor = '#222';

  score = 20;
  displayScore(score);

  randomNumber = getRandom();
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.guess').value = '';
  document.querySelector('.guess').textContent = '';

  displayMessage('Start guessing...');
}
//#endregion
