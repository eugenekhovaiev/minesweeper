export function getIndex(row, col, size) {
  return row * size + col;
}

const getRow = (index, size) => Math.floor(index / size);
const getCol = (index, size) => index % size;

function isValid(row, col, size) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

export function getSurrCells(index, matrix) {
  const surrCells = [];

  const size = Math.sqrt(matrix.length);

  const row = getRow(index, size);
  const col = getCol(index, size);

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (isValid(row + i, col + j, size)) {
        surrCells.push(matrix[getIndex(row + i, col + j, size)]);
      }
    }
  }

  return surrCells;
}

export function findButtonIndex(button, matrix) {
  return matrix.findIndex((cell) => cell.button === button);
}

export function openCell(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const buttonCell = matrix[buttonIndex];

  if (button.classList.contains('cell_opened') || button.classList.contains('cell_flagged')) return true;

  buttonCell.status = 'opened';
  button.classList.add('cell_opened');
  // console.log(matrix);

  if (buttonCell.inner === 0) {
    button.innerHTML = '';

    const surrCells = getSurrCells(buttonIndex, matrix);
    surrCells.forEach((cell) => {
      openCell(cell.button, matrix);
    });
    return true;
  }

  if (buttonCell.inner === 'bomb') {
    button.classList.add('cell_exploded');
    return false;
  }

  button.innerHTML = buttonCell.inner;
  button.classList.add(`cell_${buttonCell.inner}`);
  return true;
}

export function openAllCells(matrix) {
  matrix.forEach((cell) => {
    openCell(cell.button, matrix);
  });
}

export function toggleFlag(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const cell = matrix[buttonIndex];
  if (button.classList.contains('cell_opened')) return;

  if (!button.classList.contains('cell_flagged')) {
    cell.status = 'flagged';
    button.classList.add('cell_flagged');
  } else {
    cell.status = null;
    button.classList.remove('cell_flagged');
  }
}

export function openSurrCells(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const surrCells = getSurrCells(buttonIndex, matrix);

  const flaggedCellsAmount = surrCells.filter((cell) => cell.button.classList.contains('cell_flagged')).length;
  if (flaggedCellsAmount < matrix[buttonIndex].inner) return true;

  let isSafe = true;
  surrCells.forEach((cell) => {
    if (!openCell(cell.button, matrix)) isSafe = false;
  });

  return isSafe;
}
