import './sass/main.scss';

const WIDTH = 10;
const HEIGHT = 10;
const BOMBS_AMOUNT = 5;

function createField(width, height) {
  const field = document.querySelector('.field');
  const button = document.createElement('button');
  button.classList.add('cell');

  field.innerHTML = button.outerHTML.repeat(width * height);

  return field;
}

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
  return row * WIDTH + col;
}
const getRow = (index) => Math.floor(index / WIDTH);
const getCol = (index) => index % WIDTH;

function addBombs(matrix, bombsAmount) {
  const minedMatrix = [...matrix];
  const minedCells = [...matrix].sort(() => Math.random() - 0.5).slice(0, bombsAmount);
  minedCells.forEach((cell) => {
    minedMatrix[getIndex(cell.row, cell.col)].inner = 'bomb';
  });
  return minedMatrix;
}

function isValid(row, col) {
  return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
}

function countBombs(row, col, matrix) {
  const newMatrix = [...matrix];
  let counter = 0;
  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
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

  if (!isValid(row, col) || cell.status === 'opened') return;

  cell.status = 'opened';
  if (cell.inner === 'bomb') {
    button.innerHTML = 'X';
  } else if (cell.inner === 0) {
    button.innerHTML = '';
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const nextButton = buttonsArray[getIndex(row + i, col + j)];
        openCell(nextButton, buttonsArray, matrix);
      }
    }
  } else {
    button.innerHTML = matrix[index].inner;
  }
}

const field = createField(WIDTH, HEIGHT);
let matrix = createMatrix(WIDTH, HEIGHT);
matrix = addBombs(matrix, BOMBS_AMOUNT);
matrix = addInners(matrix);
console.log(matrix);

const buttons = field.querySelectorAll('.cell');
const buttonsArray = Array.from(buttons);

field.addEventListener('click', (event) => {
  const button = event.target.closest('.cell');

  if (!button) return;

  // const buttonIndex = buttonsArray.indexOf(button);
  openCell(button, buttonsArray, matrix);
  // button.innerHTML = matrix[buttonsArray.indexOf(button)].inner;
});
