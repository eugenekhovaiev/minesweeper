import {
  openCell,
  toggleFlag,
} from '../matrix/aditionals';

function sendLoadEvent(from) {
  const load = new Event('loadsave', { bubbles: true });
  from.dispatchEvent(load);
}

export default function loadSave() {
  const buttonsArray = Array.from(document.querySelectorAll('.cell'));
  const save = JSON.parse(localStorage.getItem('goodSave420'));
  let matrixCopy = [];

  if (save) {
    matrixCopy = save.map((cell, index) => {
      const button = buttonsArray[index];
      cell.button = button;
      return cell;
    });

    matrixCopy.forEach((cell) => {
      if (cell.status === 'opened') {
        openCell(cell.button, matrixCopy);
      } else if (cell.status === 'flagged') {
        toggleFlag(cell.button, matrixCopy);
      }
    });
    sendLoadEvent(document);
    return matrixCopy;
  }
}
