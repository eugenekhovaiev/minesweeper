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

      // TODO fix disapering flag
      toggleFlag(button, this.matrix);

      this.saveGame();
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

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

    this.start(size, bombsAmount, this.where);
  }

  saveGame() {
    localStorage.setItem('save', JSON.stringify(this.matrix));
  }

  removeSave() {
    localStorage.setItem('save', null);
  }

  loadSave() {
    const buttonsArray = Array.from(this.field.querySelectorAll('.cell'));
    const save = JSON.parse(localStorage.getItem('save'));

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
      // console.log(this.matrix);
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
