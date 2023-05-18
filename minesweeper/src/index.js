import './sass/main.scss';

import { createField, createContainer } from './modules/editHTML';
import {
  createMatrix,
  openCell,
  toggleFlag,
  openSurrCells,
} from './modules/matrix';

import {
  HEIGHT,
  WIDTH,
  BOMBS_AMOUNT,
} from './modules/game-options';

function minesweeperStart(fieldWidth, fieldHeight, fieldBombsAmount) {
  function winFunc(event) {
    console.log(event);
    console.log('win');
  }

  function lossFunc(event) {
    console.log(event);
    console.log('loss');
  }

  const container = createContainer(document.body);
  const field = createField(container, fieldWidth, fieldHeight);
  const buttonsArray = Array.from(field.querySelectorAll('.cell'));

  let matrix = [];

  field.addEventListener('click', (event) => {
    const button = event.target.closest('.cell');
    if (!button) return;

    matrix = createMatrix(fieldWidth, fieldHeight, buttonsArray, button);
    // openAllCells(matrix);
    console.log(matrix);
  }, { once: true });

  field.addEventListener('click', (event) => {
    const button = event.target.closest('.cell');
    if (!button) return;

    const isSafe = openCell(button, matrix);

    if (!isSafe) {
      const boomEvent = new Event('boom', { bubbles: true });
      button.dispatchEvent(boomEvent);
    }

    const openedButtonsAmount = field.querySelectorAll('.cell_opened').length;
    const buttonsAmount = fieldWidth * fieldHeight;
    // TODO fix winning codition
    if (openedButtonsAmount + fieldBombsAmount === buttonsAmount && button.innerHTML !== 'X') {
      const winEvent = new Event('win', { bubbles: true });
      button.dispatchEvent(winEvent);
    }
  });

  field.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const button = event.target.closest('.cell');
    if (!button) return;
    // TODO fix disapering flag
    toggleFlag(button, matrix);
  });

  field.addEventListener('dblclick', (event) => {
    const button = event.target.closest('.cell');
    if (!button) return;

    openSurrCells(button, matrix);
  });

  document.addEventListener('boom', lossFunc);

  document.addEventListener('win', winFunc);
}

minesweeperStart(WIDTH, HEIGHT, BOMBS_AMOUNT);
