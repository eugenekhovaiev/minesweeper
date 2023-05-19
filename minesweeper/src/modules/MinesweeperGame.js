import { createField } from './edit-HTML';

import createMatrix from './matrix/createMatrix';

import {
  openCell,
  toggleFlag,
  openSurrCells,
} from './matrix/aditionals';

function sendCountIncreaseEvent(from) {
  const change = new Event('increaseCounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendCountDecreaseEvent(from) {
  const change = new Event('decreaseCounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendCountInitEvent(from) {
  const init = new Event('initCounter', { bubbles: true });
  from.dispatchEvent(init);
}

function sendMoveEvent(from) {
  const move = new Event('move', { bubbles: true });
  from.dispatchEvent(move);
}

function sendLoadEvent(from) {
  const load = new Event('loadSave', { bubbles: true });
  from.dispatchEvent(load);
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

    this.loadSave();

    this.field.addEventListener('click', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      if (!this.matrix) {
        this.matrix = createMatrix(size, bombsAmount, buttonsArray, button);
        sendCountInitEvent(document);
      }

      if (!button.classList.contains('cell_opened')) {
        sendMoveEvent(document);
      }

      const isSafe = openCell(button, this.matrix);

      this.saveGame();

      if (!isSafe) {
        this.lossFunc();
      }

      if (isWin(this.matrix)) {
        this.winFunc();
      }
    });

    this.field.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const button = event.target.closest('.cell');
      if (!button) return;

      if (!button.classList.contains('cell_flagged')) {
        sendCountDecreaseEvent(document);
      } else {
        sendCountIncreaseEvent(document);
      }

      if (!button.classList.contains('cell_opened')) {
        sendMoveEvent(document);
      }

      // TODO fix disapering flag
      toggleFlag(button, this.matrix);

      this.saveGame();
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      sendMoveEvent(document);

      const isSafe = openSurrCells(button, this.matrix);

      this.saveGame();

      if (!isSafe) {
        this.lossFunc();
      }

      if (isWin(this.matrix)) {
        this.winFunc();
      }
    });
  }

  restart(size, bombsAmount) {
    this.matrix = null;
    this.field.remove();
    this.field = null;
    this.removeSave();

    const movesCounter = document.querySelector('.moves-counter');
    movesCounter.innerHTML = 0;

    this.start(size, bombsAmount, this.where);
  }

  saveGame() {
    localStorage.setItem('goodSave420', JSON.stringify(this.matrix));
    // console.log(document.querySelector('.moves-counter'));
    localStorage.setItem('goodMovesSave420', document.querySelector('.moves-counter').innerHTML);
    localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-counter').innerHTML);
  }

  removeSave() {
    localStorage.setItem('goodSave420', null);
    localStorage.setItem('goodMovesSave420', null);
    localStorage.setItem('goodBombsSave420', null);
  }

  loadSave() {
    const buttonsArray = Array.from(this.field.querySelectorAll('.cell'));
    const save = JSON.parse(localStorage.getItem('goodSave420'));

    if (save) {
      this.matrix = save.map((cell, index) => {
        const button = buttonsArray[index];
        cell.button = button;
        return cell;
      });

      this.matrix.forEach((cell) => {
        if (cell.status === 'opened') {
          openCell(cell.button, this.matrix);
        } else if (cell.status === 'flagged') {
          toggleFlag(cell.button, this.matrix);
        }
      });
      sendLoadEvent(document);
    }
  }

  winFunc() {
    alert('win');
    this.removeSave();
  }

  lossFunc() {
    alert('loss');
    this.removeSave();
  }
}
