import { createField } from './edit-HTML';

import createMatrix from './matrix/createMatrix';

import {
  openCell,
  toggleFlag,
  openSurrCells,
} from './matrix/aditionalFuncs';

import removeSave from './saving-loading/removeSave';
import loadSave from './saving-loading/loadSave';

function sendCountIncreaseEvent(from) {
  const change = new Event('increasecounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendCountDecreaseEvent(from) {
  const change = new Event('decreasecounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendInitEvent(from) {
  const init = new Event('init', { bubbles: true });
  from.dispatchEvent(init);
}

function sendMoveEvent(from) {
  const move = new Event('move', { bubbles: true });
  from.dispatchEvent(move);
}

function sendWinEvent(from) {
  const win = new Event('win', { bubbles: true });
  from.dispatchEvent(win);
}

function sendLossEvent(from) {
  const loss = new Event('loss', { bubbles: true });
  from.dispatchEvent(loss);
}

export default class MinesweeperGame {
  constructor(where) {
    this.where = where;
    this.matrix = null;
    this.field = null;
  }

  start(size, bombsAmount) {
    function isWin(matrix) {
      const openedSafeCells = matrix.filter((cell) => cell.status === 'opened' && cell.inner !== 'bomb');
      const safeCells = matrix.filter((cell) => cell.inner !== 'bomb');
      // console.log(openedSafeCells.length + ' : ' + safeCells.length);
      return openedSafeCells.length === safeCells.length;
    }

    this.field = createField(this.where, size);
    const buttonsArray = Array.from(this.field.querySelectorAll('.cell'));

    this.matrix = loadSave(this.matrix);

    this.field.addEventListener('click', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      if (!this.matrix) {
        this.matrix = createMatrix(size, bombsAmount, buttonsArray, button);
        sendInitEvent(document);
      }

      if (!button.classList.contains('cell_opened') && !button.classList.contains('cell_flagged')) {
        sendMoveEvent(button);
      }

      const isSafe = openCell(button, this.matrix);

      if (!isSafe) {
        sendLossEvent(document);
      }

      if (isWin(this.matrix)) {
        sendWinEvent(document);
      }
    });

    this.field.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const button = event.target.closest('.cell');
      if (!button || button.classList.contains('cell_opened')) return;

      sendMoveEvent(document);

      if (!button.classList.contains('cell_flagged')) {
        sendCountDecreaseEvent(document);
      } else {
        sendCountIncreaseEvent(document);
      }

      toggleFlag(button, this.matrix);
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button || button.classList.contains('cell_flagged')) return;

      sendMoveEvent(button);

      const isSafe = openSurrCells(button, this.matrix);

      if (!isSafe) {
        sendLossEvent(document);
      }

      if (isWin(this.matrix)) {
        sendWinEvent(document);
      }
    });
  }

  restart(size, bombsAmount) {
    this.matrix = null;
    this.field.remove();
    this.field = null;
    removeSave();

    const movesCounter = document.querySelector('.moves-counter');
    movesCounter.innerHTML = 0;

    this.start(size, bombsAmount, this.where);
  }
}
