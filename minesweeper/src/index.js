import './sass/main.scss';

import { createField, createContainer } from './modules/editHTML';

const WIDTH = 10;
const HEIGHT = 10;
const BOMBS_AMOUNT = 20;

function minesweeperStart(fieldWidth, fieldHeight, fieldBombsAmount) {
  function createMatrix(width, height) {
    const matrix = [];
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        const cell = {
          row: i,
          col: j,
        };

        matrix.push(cell);
      }
    }
    return matrix;
  }

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

  function addBombs(matrix, bombsAmount, unmined) {
    const newMatrix = [...matrix];

    const index = buttonsArray.indexOf(unmined);
    const unminedCells = getSurrCells(index, matrix);

    let minedCells = [...matrix].filter((cell) => !unminedCells.includes(cell));
    minedCells = minedCells.sort(() => Math.random() - 0.5).slice(0, bombsAmount);
    minedCells.forEach((cell) => {
      newMatrix[getIndex(cell.row, cell.col)].inner = 'bomb';
    });
    return newMatrix;
  }

  function countBombs(row, col, matrix) {
    const newMatrix = [...matrix];
    let counter = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        const index = getIndex(row + i, col + j);
        if (isValid(row + i, col + j) && newMatrix[index].inner === 'bomb') {
          counter += 1;
        }
      }
    }
    return counter;
  }

  function addInners(matrix) {
    const newMatrix = [...matrix];
    newMatrix.forEach((cell, index) => {
      const row = getRow(index);
      const col = getCol(index);

      if (cell.inner !== 'bomb') {
        // const newCell = { ...cell };
        cell.inner = countBombs(row, col, matrix);
        // newMatrix[index] = newCell;
      }
    });
    return newMatrix;
  }

  function openCell(button, buttonsArray, matrix) {
    const index = buttonsArray.indexOf(button);
    const row = getRow(index);
    const col = getCol(index);

    const cell = matrix[index];

    if (cell.status === 'opened') return;

    cell.status = 'opened';
    button.classList.add('cell_opened');
    if (cell.inner === 0) {
      button.innerHTML = '';
      // const surrCells = getSurrCells(index, matrix);
      // console.log(surrCells);
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          if (isValid(row + i, col + j)) {
            const nextButton = buttonsArray[getIndex(row + i, col + j)];
            openCell(nextButton, buttonsArray, matrix);
          }
        }
      }
    } else if (cell.inner === 'bomb') {
      button.innerHTML = 'X';
      const boomEvent = new Event('boom', { bubbles: true });
      button.dispatchEvent(boomEvent);
    } else {
      button.innerHTML = matrix[index].inner;
    }
  }

  const container = createContainer(document.body);
  const field = createField(container, fieldWidth, fieldHeight);
  const buttonsArray = Array.from(field.querySelectorAll('.cell'));

  let matrix = [];
  function addMatrix(event) {
    const button = event.target.closest('.cell');
    if (!button) return;

    matrix = createMatrix(fieldWidth, fieldHeight);
    matrix = addBombs(matrix, fieldBombsAmount, button);
    matrix = addInners(matrix);
    console.log(matrix);

    field.removeEventListener('click', addMatrix);
  }

  field.addEventListener('click', addMatrix);

  field.addEventListener('click', (event) => {
    const button = event.target.closest('.cell');

    if (!button) return;

    openCell(button, buttonsArray, matrix);

    const openedButtons = field.querySelectorAll('.cell_opened');
    if (openedButtons.length + fieldBombsAmount === fieldWidth * fieldHeight) {
      const winEvent = new Event('win', { bubbles: true });
      button.dispatchEvent(winEvent);
    }
  });

  document.addEventListener('boom', (event) => {
    console.log(event);
    alert('loose');
  });

  document.addEventListener('win', (event) => {
    console.log(event);
    alert('win');
  });
}

minesweeperStart(WIDTH, HEIGHT, BOMBS_AMOUNT);
