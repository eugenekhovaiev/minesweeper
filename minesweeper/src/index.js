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

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

const bombCounter = createBombCounter(container);
document.addEventListener('count', () => {
  bombCounter.innerHTML = minesweeperGame.countRemainingBombs(BOMBS_AMOUNT);
});

minesweeperGame.start(SIZE, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(SIZE, BOMBS_AMOUNT, container);
});
