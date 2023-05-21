import {
  getSurrCells,
  findButtonIndex,
  getIndex,
} from './aditionalFuncs';

export default function createMatrix(size, bombsAmount, buttonsArray, saveButton) {
  function countBombs(index, matrix) {
    const bombCells = getSurrCells(index, matrix).filter((cell) => cell.inner === 'bomb');
    return bombCells.length;
  }

  function addBombs(matrix, safeButton) {
    const newMatrix = [...matrix];

    const safeButtonIndex = findButtonIndex(safeButton, newMatrix);
    const saveCells = getSurrCells(safeButtonIndex, matrix);

    let minedCells = [...matrix].filter((cell) => !saveCells.includes(cell));
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
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const cell = {
        row: i,
        col: j,
        button: buttonsArray[getIndex(i, j, size, size)],
      };

      matrix.push(cell);
    }
  }

  matrix = addBombs(matrix, saveButton);
  matrix = addInners(matrix);

  return matrix;
}
