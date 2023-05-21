import './sass/main.scss';
// import * as bootstrap from 'bootstrap';

import {
  createContainer,
  createRestartButton,
  createSizeSelect,
  createBombsSlider,
} from './modules/edit-HTML';

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

import flagSoundFile from './assets/audio/flag.wav';
import boomSoundFile from './assets/audio/boom.wav';
import winSoundFile from './assets/audio/win.wav';
import revealSoundFile from './assets/audio/reveal.wav';

const flagAudio = new Audio(flagSoundFile);
const boomAudio = new Audio(boomSoundFile);
const winAudio = new Audio(winSoundFile);
const revealAudio = new Audio(revealSoundFile);

const container = createContainer(document.body);

const minesweeperGame = new MinesweeperGame(container);

function sendNewGameEvent(from, size) {
  const newGame = new CustomEvent('newgame', { bubbles: true, detail: { size } });
  from.dispatchEvent(newGame);
}

const sizeSelect = createSizeSelect(document.body);
sizeSelect.addEventListener('change', (event) => {
  console.log(event.target.value);
  switch (event.target.value) {
    case '10':
      sendNewGameEvent(event.target, 10);
      break;
    case '15':
      sendNewGameEvent(event.target, 15);
      break;
    case '25':
      sendNewGameEvent(event.target, 25);
      break;
    default:
      break;
  }
});

const bombsSlider = createBombsSlider(document.body);
const bombSliderInput = bombsSlider.querySelector('.bombs-slider__input');
const bombSliderSelected = bombsSlider.querySelector('.bombs-slider__selected');
bombSliderInput.addEventListener('input', () => {
  bombSliderSelected.innerHTML = bombSliderInput.value;
  sendNewGameEvent(document, +sizeSelect.value);
});

const bombsCounter = new RemainingBombsCounter(+bombSliderInput.value, container);
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
  bombsCounter.load(+bombSliderInput.value);
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

const restartButton = createRestartButton(container);
restartButton.addEventListener('click', () => {
  sendNewGameEvent(document, +sizeSelect.value);
});

const soundButton = new SoundButton(document.body);
soundButton.node.addEventListener('click', () => {
  soundButton.change();
});

document.addEventListener('newgame', (event) => {
  minesweeperGame.restart(event.detail.size, +bombSliderInput.value, container);
  movesCounter.load(0);
  bombsCounter.load(bombSliderInput.value);
  timer.stop();
  timer.load(0);
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

window.addEventListener('beforeunload', () => {
  save(minesweeperGame.matrix);
});

document.addEventListener('DOMContentLoaded', () => {
  highScoreTable.load(JSON.parse(localStorage.getItem('goodHighScoreSave420')));
  const savedSize = +localStorage.getItem('goodSizeSave420');
  if (!savedSize) {
    sizeSelect.value = 10;
    bombSliderInput.value = 10;
    bombSliderSelected.innerHTML = 10;

    minesweeperGame.start(10, 10);
  } else {
    sizeSelect.value = savedSize;
    bombSliderInput.value = +localStorage.getItem('goodBombsSave420');
    bombSliderSelected.innerHTML = bombSliderInput.value;

    minesweeperGame.start(savedSize, +bombSliderInput.value);
  }
});
