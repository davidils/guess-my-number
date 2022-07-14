'use strict';

let secretNumber = createSecretNumber();
let score = 20;
let highScore = 0;
updateScore(score);
updateHighScore(highScore);

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function updateScore(score) {
  document.querySelector('.score').textContent = score;
}

function updateHighScore(highScore) {
  document.querySelector('.highscore').textContent = highScore;
}

function createSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function resetUI() {
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}

function showWinnerUI() {
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
}

// When the user clicks on the "Again!" button
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = createSecretNumber();
  score = 20;

  updateScore(score);
  resetUI();
});

// // When the user clicks on the "Check!" button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // No input
  if (!guess) {
    displayMessage('No number!');

    // User guessed the correct number
  } else if (guess === secretNumber) {
    displayMessage('Correct Number!');
    showWinnerUI();
    if (score > highScore) {
      highScore = score;
      updateHighScore(highScore);
    }

    // User did not guess the correct number
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      updateScore(score);
    } else {
      displayMessage('You lost the game!');
      updateScore(0);
    }
  }
});
