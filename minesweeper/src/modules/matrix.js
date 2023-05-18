import {
  HEIGHT,
  WIDTH,
  BOMBS_AMOUNT,
} from './game-options';

function getIndex(row, col) {
  return row * WIDTH + col;
}
const getRow = (index) => Math.floor(index / WIDTH);
const getCol = (index) => index % WIDTH;

function isValid(row, col) {
  return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
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

function findButtonIndex(button, matrix) {
  return matrix.findIndex((cell) => cell.button === button);
}

export function createMatrix(width, height, buttonsArray, unminedButton) {
  function countBombs(index, matrix) {
    const bombCells = getSurrCells(index, matrix).filter((cell) => cell.inner === 'bomb');
    return bombCells.length;
  }

  function addBombs(matrix, bombsAmount, safeButton) {
    const newMatrix = [...matrix];

    const safeButtonIndex = findButtonIndex(safeButton, newMatrix);
    const unminedCells = getSurrCells(safeButtonIndex, matrix);

    let minedCells = [...matrix].filter((cell) => !unminedCells.includes(cell));
    minedCells = minedCells.sort(() => Math.random() - 0.5).slice(0, bombsAmount);

    minedCells.forEach((cell) => {
      const minedButtonIndex = findButtonIndex(cell.button, matrix);
      newMatrix[minedButtonIndex].inner = 'bomb';
    });
    return newMatrix;
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

  let matrix = [];
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

  matrix = addBombs(matrix, BOMBS_AMOUNT, unminedButton);
  matrix = addInners(matrix);

  return matrix;
}

export function openCell(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const buttonCell = matrix[buttonIndex];

  if (buttonCell.status === 'opened' || buttonCell.status === 'flag') return true;

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

export function openAllCells(matrix) {
  matrix.forEach((cell) => {
    if (!cell.inner) return;
    cell.button.innerHTML = cell.inner;
  });
}

export function toggleFlag(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const cell = matrix[buttonIndex];
  if (cell.status === 'opened') return;

  if (cell.status !== 'flag') {
    cell.status = 'flag';
    button.innerHTML = 'F';
  } else {
    cell.status = null;
    button.innerHTML = '';
  }
}

export function openSurrCells(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const surrCells = getSurrCells(buttonIndex, matrix);
  surrCells.forEach((cell) => {
    openCell(cell.button, matrix);
  });
}
