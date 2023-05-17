import './sass/main.scss';

import { createField, createContainer } from './modules/editHTML';

const WIDTH = 10;
const HEIGHT = 10;
const BOMBS_AMOUNT = 3;

function minesweeperStart(fieldWidth, fieldHeight, fieldBombsAmount) {
  function getIndex(row, col) {
    return row * fieldWidth + col;
  }
  const getRow = (index) => Math.floor(index / fieldWidth);
  const getCol = (index) => index % fieldWidth;

  function isValid(row, col) {
    return row >= 0 && row < fieldHeight && col >= 0 && col < fieldWidth;
  }

  function getSurrCells(index, matrix) {
    const surrCells = [];

    const row = getRow(index);
    const col = getCol(index);

    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (isValid(row + i, col + j)) {
          surrCells.push(matrix[getIndex(row + i, col + j)]);
        }
      }
    }

    return surrCells;
  }

  function findButtonIndex(matrix, button) {
    return matrix.findIndex((cell) => cell.button === button);
  }

  function createMatrix(width, height, buttonsArray) {
    const matrix = [];
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        const cell = {
          row: i,
          col: j,
          button: buttonsArray[getIndex(i, j)],
        };

        matrix.push(cell);
      }
    }
    return matrix;
  }

  function addBombs(matrix, bombsAmount, safeButton) {
    const newMatrix = [...matrix];

    const safeButtonIndex = findButtonIndex(newMatrix, safeButton);
    const unminedCells = getSurrCells(safeButtonIndex, matrix);

    let minedCells = [...matrix].filter((cell) => !unminedCells.includes(cell));
    minedCells = minedCells.sort(() => Math.random() - 0.5).slice(0, bombsAmount);

    minedCells.forEach((cell) => {
      const minedButtonIndex = findButtonIndex(matrix, cell.button);
      newMatrix[minedButtonIndex].inner = 'bomb';
    });
    return newMatrix;
  }

  function countBombs(index, matrix) {
    const bombCells = getSurrCells(index, matrix).filter((cell) => cell.inner === 'bomb');
    return bombCells.length;
  }

  function addInners(matrix) {
    const newMatrix = [...matrix];
    newMatrix.forEach((cell, index) => {
      if (cell.inner !== 'bomb') {
        cell.inner = countBombs(index, matrix);
      }
    });
    return newMatrix;
  }

  function openCell(button, matrix) {
    const buttonIndex = findButtonIndex(matrix, button);
    const buttonCell = matrix[buttonIndex];

    if (buttonCell.status === 'opened') return true;

    buttonCell.status = 'opened';
    button.classList.add('cell_opened');

    if (buttonCell.inner === 0) {
      button.innerHTML = '';

      const surrCells = getSurrCells(buttonIndex, matrix);
      surrCells.forEach((cell) => {
        openCell(cell.button, matrix);
      });
      return true;
    }

    if (buttonCell.inner === 'bomb') {
      button.innerHTML = 'X';
      return false;
    }

    button.innerHTML = matrix[buttonIndex].inner;
    return true;
  }

  function openAllCells(matrix) {
    matrix.forEach((cell) => {
      if (!cell.inner) return;
      cell.button.innerHTML = cell.inner;
    });
  }

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

    matrix = createMatrix(fieldWidth, fieldHeight, buttonsArray);
    matrix = addBombs(matrix, fieldBombsAmount, button);
    matrix = addInners(matrix);
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
    if (openedButtonsAmount + fieldBombsAmount === buttonsAmount && button.innerHTML !== 'X') {
      const winEvent = new Event('win', { bubbles: true });
      button.dispatchEvent(winEvent);
    }
  });

  document.addEventListener('boom', lossFunc);

  document.addEventListener('win', winFunc);
}

minesweeperStart(WIDTH, HEIGHT, BOMBS_AMOUNT);
