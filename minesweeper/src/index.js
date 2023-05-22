import './sass/main.scss';

import {
  createStartHTML,
  createRestartButton,
  createSizeSelect,
  createBombsSlider,
} from './modules/edit-HTML';

import MinesweeperGame from './modules/components/MinesweeperGame';

import RemainingBombsCounter from './modules/components/RemainingBombsCounter';
import MovesCounter from './modules/components/MovesCounter';
import Timer from './modules/components/Timer';
import RecordsTable from './modules/components/RecordsTable';
import SoundButton from './modules/components/SoundButton';

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

createStartHTML();
const menu = document.querySelector('.menu');
const stats = document.querySelector('.stats');

const minesweeperGame = new MinesweeperGame(menu);

function sendNewGameEvent(from) {
  const newGame = new CustomEvent('newgame', { bubbles: true });
  from.dispatchEvent(newGame);
}

const sizeSelect = createSizeSelect(document.querySelector('.menu__size'));
sizeSelect.addEventListener('change', (event) => {
  sendNewGameEvent(event.target);
});

const bombsSlider = createBombsSlider(document.querySelector('.menu__bombs'));
const bombSliderInput = bombsSlider.querySelector('.bombs-slider__input');
const bombSliderSelected = bombsSlider.querySelector('.bombs-slider__selected');
bombSliderInput.addEventListener('input', () => {
  bombSliderSelected.innerHTML = bombSliderInput.value;
  sendNewGameEvent(document);
});

const bombsCounter = new RemainingBombsCounter(+bombSliderInput.value, document.querySelector('.stats__bombs'));
document.addEventListener('increasecounter', () => {
  bombsCounter.increase();
  playAudio(flagAudio);
});
document.addEventListener('decreasecounter', () => {
  bombsCounter.decrease();
  playAudio(flagAudio);
});

const movesCounter = new MovesCounter(0, document.querySelector('.stats__moves'));
document.addEventListener('move', (event) => {
  if (event.target.nodeName === 'BUTTON') {
    playAudio(revealAudio);
  }
  movesCounter.increase();
});

const timerWrapper = document.querySelector('.timer-wrapper');
const timer = new Timer(stats);
timerWrapper.replaceWith(timer.node);

document.addEventListener('init', () => {
  bombsCounter.load(+bombSliderInput.value);
  timer.start();
});

const highScoreTable = new RecordsTable(document.body);
document.addEventListener('win', () => {
  timer.stop();
  playAudio(winAudio);
  winFunc(timer.node.innerHTML, movesCounter.node.innerHTML, highScoreTable);
});
document.addEventListener('loss', () => {
  timer.stop();
  playAudio(boomAudio);
  lossFunc(minesweeperGame.matrix);
});

const recordsButton = document.querySelector('.button_records');
recordsButton.addEventListener('click', () => {
  highScoreTable.node.classList.toggle('records-table_active');
});

const restartButton = createRestartButton(stats);
restartButton.addEventListener('click', () => {
  sendNewGameEvent(document);
});

const soundButton = new SoundButton(document.querySelector('.menu__sound'));
soundButton.node.addEventListener('click', () => {
  soundButton.change();
});

document.addEventListener('newgame', () => {
  minesweeperGame.restart(+sizeSelect.value, +bombSliderInput.value, menu);
  movesCounter.load(0);
  bombsCounter.load(bombSliderInput.value);
  timer.stop();
  timer.load(0);

  const message = document.querySelector('.message');
  if (message) message.remove();
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
  bombsCounter.load(+bombSliderInput.value);
});
