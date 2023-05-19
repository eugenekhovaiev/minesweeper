import './sass/main.scss';

import {
  createContainer,
  createRestartButton,
} from './modules/edit-HTML';

import {
  SIZE,
  BOMBS_AMOUNT,
} from './modules/game-options';

import MinesweeperGame from './modules/MinesweeperGame';

import RemainingBombsCounter from './modules/RemainingBombsCounter';

import MovesCounter from './modules/MovesCounter';

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

const bombsCounter = new RemainingBombsCounter(BOMBS_AMOUNT, container);
document.addEventListener('increaseCounter', () => {
  bombsCounter.increase();
});
document.addEventListener('decreaseCounter', () => {
  bombsCounter.decrease();
});
document.addEventListener('initCounter', () => {
  bombsCounter.load(BOMBS_AMOUNT);
});

const movesCounter = new MovesCounter(0, container);
document.addEventListener('move', () => {
  movesCounter.increase();
});

document.addEventListener('loadSave', () => {
  movesCounter.load(+localStorage.getItem('goodMovesSave420'));
  bombsCounter.load(+localStorage.getItem('goodBombsSave420'));
});

minesweeperGame.start(SIZE, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(SIZE, BOMBS_AMOUNT, container);
  movesCounter.load(0);
  bombsCounter.load('');
});
