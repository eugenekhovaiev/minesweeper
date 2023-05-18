import './sass/main.scss';

import {
  createField,
  createContainer,
  createRestartButton,
} from './modules/editHTML';

import {
  createMatrix,
  openCell,
  toggleFlag,
  openSurrCells,
} from './modules/matrix';

import {
  HEIGHT,
  WIDTH,
  BOMBS_AMOUNT,
} from './modules/game-options';

class MinesweeperGame {
  constructor(where) {
    this.where = where;
    this.matrix = null;
    this.field = null;
  }

  start(fieldWidth, fieldHeight, fieldBombsAmount) {
    function winFunc(event) {
      console.log(event);
      console.log('win');
    }

    function lossFunc(event) {
      console.log(event);
      console.log('loss');
    }

    this.field = createField(this.where, fieldWidth, fieldHeight);
    const buttonsArray = Array.from(this.field.querySelectorAll('.cell'));

    this.field.addEventListener('click', (event) => {
      const button = event.target.closest('.cell');
      if (!button || this.matrix) return;

      this.matrix = createMatrix(fieldWidth, fieldHeight, buttonsArray, button);
      // openAllCells(matrix);
      console.log(this.matrix);
    });

    this.field.addEventListener('click', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      const isSafe = openCell(button, this.matrix);

      if (!isSafe) {
        const boomEvent = new Event('boom', { bubbles: true });
        button.dispatchEvent(boomEvent);
      }

      const openedButtonsAmount = this.field.querySelectorAll('.cell_opened').length;
      const buttonsAmount = fieldWidth * fieldHeight;
      // TODO fix winning codition
      if (openedButtonsAmount + fieldBombsAmount === buttonsAmount && button.innerHTML !== 'X') {
        const winEvent = new Event('win', { bubbles: true });
        button.dispatchEvent(winEvent);
      }
    });

    this.field.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const button = event.target.closest('.cell');
      if (!button) return;
      // TODO fix disapering flag
      toggleFlag(button, this.matrix);
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      openSurrCells(button, this.matrix);
    });

    document.addEventListener('boom', lossFunc);

    document.addEventListener('win', winFunc);
  }

  restart(fieldWidth, fieldHeight, fieldBombsAmount) {
    this.matrix = null;
    this.field.remove();
    this.field = null;

    this.start(fieldWidth, fieldHeight, fieldBombsAmount, this.where);
  }
}

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

minesweeperGame.start(WIDTH, HEIGHT, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(WIDTH, HEIGHT, BOMBS_AMOUNT, container);
});
