import './sass/main.scss';

import {
  createContainer,
  createRestartButton,
} from './modules/editHTML';

import {
  HEIGHT,
  WIDTH,
  BOMBS_AMOUNT,
} from './modules/game-options';

import MinesweeperGame from './modules/MinesweeperGame';

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

minesweeperGame.start(WIDTH, HEIGHT, BOMBS_AMOUNT);

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(WIDTH, HEIGHT, BOMBS_AMOUNT, container);
});
