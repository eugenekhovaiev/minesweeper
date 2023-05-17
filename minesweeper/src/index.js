import './sass/main.scss';

import { createField, createContainer } from './modules/editHTML';

const WIDTH = 10;
const HEIGHT = 10;
const BOMBS_AMOUNT = 10;

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

  function addBombs(matrix, bombsAmount, saveButton) {
    const newMatrix = [...matrix];

    const saveButtonIndex = findButtonIndex(newMatrix, saveButton);
    const unminedCells = getSurrCells(saveButtonIndex, matrix);

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
        // const newCell = { ...cell };
        cell.inner = countBombs(index, matrix);
        // newMatrix[index] = newCell;
      }
    });
    return newMatrix;
  }

  function openCell(button, matrix) {
    const buttonIndex = findButtonIndex(matrix, button);
    const buttonCell = matrix[buttonIndex];

    if (buttonCell.status === 'opened') return;

    buttonCell.status = 'opened';
    button.classList.add('cell_opened');

    if (buttonCell.inner === 0) {
      button.innerHTML = '';

      const surrCells = getSurrCells(buttonIndex, matrix);
      surrCells.forEach((cell) => {
        openCell(cell.button, matrix);
      });
    } else if (buttonCell.inner === 'bomb') {
      button.innerHTML = 'X';

      // const boomEvent = new Event('boom', { bubbles: true });
      // button.dispatchEvent(boomEvent);
    } else {
      button.innerHTML = matrix[buttonIndex].inner;
    }
  }

  function openAllCells(matrix) {
    matrix.forEach((cell) => {
      if (!cell.inner) return;
      cell.button.innerHTML = cell.inner;
    });
  }

  const container = createContainer(document.body);
  const field = createField(container, fieldWidth, fieldHeight);
  const buttonsArray = Array.from(field.querySelectorAll('.cell'));

  let matrix = [];
  function addMatrix(event) {
    const button = event.target.closest('.cell');
    if (!button) return;

    matrix = createMatrix(fieldWidth, fieldHeight, buttonsArray);
    matrix = addBombs(matrix, fieldBombsAmount, button);
    matrix = addInners(matrix);
    // openAllCells(matrix);
    console.log(matrix);

    field.removeEventListener('click', addMatrix);
  }

  field.addEventListener('click', addMatrix);

  field.addEventListener('click', (event) => {
    const button = event.target.closest('.cell');

    if (!button) return;

    openCell(button, matrix);

    // const openedButtons = field.querySelectorAll('.cell_opened');
    // if (openedButtons.length + fieldBombsAmount === fieldWidth * fieldHeight) {
    //   const winEvent = new Event('win', { bubbles: true });
    //   button.dispatchEvent(winEvent);
    // }
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
