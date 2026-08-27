'use strict';

const errorMessageElement = document.querySelector('#error-message');
const inputNumberField = document.querySelector('#input-number-field');
const submitButton = document.querySelector('#submit');
const tooHighElement = document.querySelector('#too-high');
const hpElement = document.querySelector('#hp');
const tooLowElement = document.querySelector('#too-low');
const foundItElement = document.querySelector('#found-it');
const correctResultElement = document.querySelector('#correct-result');
const incorrectResultElement = document.querySelector('#incorrect-result');
const boomCheckButton = document.querySelector('#boom-check');
const playAgainButton = document.querySelector('#play-again-button');

let hp = 10;
hpElement.textContent = hp;

let boomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  hp--;
  if (hp <= 0) {
    foundItElement.classList.add('hidden');
    incorrectResultElement.classList.remove('hidden');
    const boomNumberElement =
      incorrectResultElement.querySelector('.boom-number');
    boomNumberElement.textContent = boomNumber;
    submitButton.disabled = true;
    boomCheckButton.disabled = true;

    boomNumber = Math.floor(Math.random() * 100) + 1;
    return;
  }
  const userInputValue = inputNumberField.value;
  if (userInputValue === '') {
    inputNumberField.classList.add('border', 'border-red-500');
    errorMessageElement.classList.add('opacity-100');
    return;
  }

  inputNumberField.classList.remove('border', 'border-red-500');
  errorMessageElement.classList.remove('opacity-100');

  const userNumberInput = Number(inputNumberField.value);

  if (userNumberInput < boomNumber) {
    tooHighElement.classList.remove('glow-red');
    tooLowElement.classList.add('glow-blue');
  } else if (userNumberInput > boomNumber) {
    tooLowElement.classList.remove('glow-blue');
    tooHighElement.classList.add('glow-red');
  } else {
    tooLowElement.classList.remove('glow-blue');
    tooHighElement.classList.remove('glow-red');
  }
  hpElement.textContent = hp;
}

function reset() {
  hp = 10;
  boomNumber = Math.floor(Math.random() * 100) + 1;
  inputNumberField.value = '';
  hpElement.textContent = hp;
  correctResultElement.classList.add('hidden');
  incorrectResultElement.classList.add('hidden');
  tooLowElement.classList.remove('glow-blue');
  tooHighElement.classList.remove('glow-red');
  foundItElement.classList.remove('hidden');
  submitButton.disabled = false;
  boomCheckButton.disabled = false;
}

function checkBoom() {
  const userInputValue = inputNumberField.value;
  if (userInputValue === '') {
    inputNumberField.classList.add('border', 'border-red-500');
    errorMessageElement.classList.add('opacity-100');
    return;
  }

  const userNumberInput = Number(inputNumberField.value);
  if (userNumberInput === boomNumber) {
    foundItElement.classList.add('hidden');
    correctResultElement.classList.remove('hidden');
    const boomNumberElement =
      correctResultElement.querySelector('.boom-number');
    boomNumberElement.textContent = boomNumber;
    submitButton.disabled = true;
    boomCheckButton.disabled = true;
  } else {
    foundItElement.classList.add('hidden');
    incorrectResultElement.classList.remove('hidden');
    const boomNumberElement =
      incorrectResultElement.querySelector('.boom-number');
    boomNumberElement.textContent = boomNumber;
    submitButton.disabled = true;
    boomCheckButton.disabled = true;
  }
}

// =============
playAgainButton.addEventListener('click', () => {
  reset();
});
submitButton.addEventListener('click', () => {
  checkGuess();
});

boomCheckButton.addEventListener('click', () => {
  checkBoom();
});
