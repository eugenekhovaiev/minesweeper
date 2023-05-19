import { createField } from './edit-HTML';

import createMatrix from './matrix/createMatrix';

import {
  openCell,
  toggleFlag,
  openSurrCells,
} from './matrix/aditionals';

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
        this.sendCountInitEvent(document);
      }

      if (!button.classList.contains('cell_opened')) {
        this.sendMoveEvent(document);
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
        this.sendCountDecreaseEvent(document);
      } else {
        this.sendCountIncreaseEvent(document);
      }

      if (!button.classList.contains('cell_opened')) {
        this.sendMoveEvent(document);
      }

      // TODO fix disapering flag
      toggleFlag(button, this.matrix);

      this.saveGame();
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      this.sendMoveEvent(document);

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
      this.sendLoadEvent(document);
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

  sendCountIncreaseEvent(from) {
    const change = new Event('increaseCounter', { bubbles: true });
    from.dispatchEvent(change);
  }

  sendCountDecreaseEvent(from) {
    const change = new Event('decreaseCounter', { bubbles: true });
    from.dispatchEvent(change);
  }

  sendCountInitEvent(from) {
    const init = new Event('initCounter', { bubbles: true });
    from.dispatchEvent(init);
  }

  sendMoveEvent(from) {
    const move = new Event('move', { bubbles: true });
    from.dispatchEvent(move);
  }

  sendLoadEvent(from) {
    const load = new Event('loadSave', { bubbles: true });
    from.dispatchEvent(load);
  }
}
