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
import Timer from './modules/Timer';

import winFunc from './modules/end-funcs/winFunc';
import lossFunc from './modules/end-funcs/lossFunc';

import saveGame from './modules/saving-loading/saveGame';

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

const bombsCounter = new RemainingBombsCounter(BOMBS_AMOUNT, container);
document.addEventListener('increasecounter', () => {
  bombsCounter.increase();
});
document.addEventListener('decreasecounter', () => {
  bombsCounter.decrease();
});

const movesCounter = new MovesCounter(0, container);
document.addEventListener('move', () => {
  movesCounter.increase();
});

const timer = new Timer(container);

document.addEventListener('loadsave', () => {
  movesCounter.load(+localStorage.getItem('goodMovesSave420'));
  bombsCounter.load(+localStorage.getItem('goodBombsSave420'));
  timer.load(+localStorage.getItem('goodTimeSave420'));
  timer.start();
});

document.addEventListener('init', () => {
  bombsCounter.load(BOMBS_AMOUNT);
  timer.start();
});

document.addEventListener('win', () => {
  timer.stop();
  winFunc(timer.node.innerHTML, movesCounter.node.innerHTML);
});
document.addEventListener('loss', () => {
  timer.stop();
  lossFunc();
});

minesweeperGame.start(SIZE, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(SIZE, BOMBS_AMOUNT, container);
  movesCounter.load(0);
  bombsCounter.load('');
  timer.stop();
  timer.load(0);
});

window.addEventListener('beforeunload', () => {
  saveGame(minesweeperGame.matrix);
});
