import './sass/main.scss';

import {
  createContainer,
  createRestartButton,
  createBombCounter,
} from './modules/edit-HTML';

import {
  SIZE,
  BOMBS_AMOUNT,
} from './modules/game-options';

import MinesweeperGame from './modules/MinesweeperGame';

// import MovesCounter from './modules/MovesCounter';
import MovesCounter from './modules/MovesCounter';

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

const bombCounter = createBombCounter(container);
document.addEventListener('count', () => {
  bombCounter.innerHTML = minesweeperGame.countRemainingBombs(BOMBS_AMOUNT);
});

const movesCounter = new MovesCounter(0, container);
document.addEventListener('move', () => {
  movesCounter.increase();
});

document.addEventListener('load', () => {
  movesCounter.load(+localStorage.getItem('goodMovesSave420'));
});

minesweeperGame.start(SIZE, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(SIZE, BOMBS_AMOUNT, container);
  movesCounter.refresh();
  // movesCounter.node.innerHTML = movesCounter.amount;
});
