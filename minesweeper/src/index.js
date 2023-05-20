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
import HighScoreTable from './modules/HighScoreTable';
import SoundButton from './modules/SoundButton';

import winFunc from './modules/end-funcs/winFunc';
import lossFunc from './modules/end-funcs/lossFunc';
import playAudio from './modules/playAudio';

import save from './modules/saving-loading/save';

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

const bombsCounter = new RemainingBombsCounter(BOMBS_AMOUNT, container);

const flagAudio = new Audio('assets/audio/flag.wav');
const boomAudio = new Audio('assets/audio/boom.wav');
const winAudio = new Audio('assets/audio/win.wav');
const revealAudio = new Audio('assets/audio/reveal.wav');

const soundButton = new SoundButton(document.body);
soundButton.node.addEventListener('click', () => {
  soundButton.change();
});

document.addEventListener('increasecounter', () => {
  bombsCounter.increase();
  playAudio(flagAudio);
});
document.addEventListener('decreasecounter', () => {
  bombsCounter.decrease();
  playAudio(flagAudio);
});

const movesCounter = new MovesCounter(0, container);
document.addEventListener('move', (event) => {
  if (event.target.nodeName === 'BUTTON') {
    playAudio(revealAudio);
  }
  movesCounter.increase();
});

const timer = new Timer(container);

document.addEventListener('init', () => {
  bombsCounter.load(BOMBS_AMOUNT);
  timer.start();
});

const highScoreTable = new HighScoreTable(document.body);
document.addEventListener('win', () => {
  timer.stop();
  playAudio(winAudio);
  winFunc(timer.node.innerHTML, movesCounter.node.innerHTML, highScoreTable);
});
document.addEventListener('loss', () => {
  timer.stop();
  playAudio(boomAudio);
  lossFunc();
});

document.addEventListener('loadsave', () => {
  movesCounter.load(+localStorage.getItem('goodMovesSave420'));
  bombsCounter.load(+localStorage.getItem('goodBombsSave420'));
  timer.load(+localStorage.getItem('goodTimeSave420'));
  timer.start();
  if (localStorage.getItem('goodSoundSave420') === 'Off') {
    soundButton.change();
  }
});

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  minesweeperGame.restart(SIZE, BOMBS_AMOUNT, container);
  movesCounter.load(0);
  bombsCounter.load('');
  timer.stop();
  timer.load(0);
});

window.addEventListener('beforeunload', () => {
  save(minesweeperGame.matrix);
});

document.addEventListener('DOMContentLoaded', () => {
  highScoreTable.load(JSON.parse(localStorage.getItem('goodHighScoreSave420')));
});

minesweeperGame.start(SIZE, BOMBS_AMOUNT);
