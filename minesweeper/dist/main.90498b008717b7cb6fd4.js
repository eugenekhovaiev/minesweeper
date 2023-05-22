/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./modules/edit-HTML.js
function createField(where, size) {
  const field = document.createElement('div');
  field.classList.add('field');
  switch (size) {
    case 15:
      field.classList.add('field_normal');
      break;
    case 25:
      field.classList.add('field_hard');
      break;
    default:
      break;
  }

  const button = document.createElement('button');
  button.classList.add('cell');

  field.innerHTML = button.outerHTML.repeat(size * size);
  where.insertAdjacentElement('afterend', field);

  return field;
}

function createStartHTML() {
  document.body.innerHTML = `
  <main class="container">
    <div class="menu">
      <div class="menu__theme">Theme is: </div>
      <div class="menu__sound">Sound is: </div>
      <div class="menu__size">Size: </div>
      <div class="menu__bombs">Bombs amount: </div>
      <button class="button button_records">Records</button>
    </div>
    <div class="stats">
      <div class="stats__timer">Time: <span class="timer-wrapper"></span>s</div>
      <div class="stats__moves"> Moves: </div>
      <div class="stats__bombs">Bombs left: </div>
    </div>
  </main>
  `;
}

function createRestartButton(where) {
  const restartButton = document.createElement('button');
  restartButton.classList.add('button', 'button_new-game');
  restartButton.innerHTML = 'New Game';
  where.insertAdjacentElement('beforeend', restartButton);

  return restartButton;
}

function createBombsCounter(where, amount) {
  const bombCounter = document.createElement('span');
  bombCounter.classList.add('bombs-counter');
  bombCounter.innerHTML = amount;
  where.insertAdjacentElement('beforeend', bombCounter);

  return bombCounter;
}

function createMovesCounter(where) {
  const movesCounter = document.createElement('span');
  movesCounter.classList.add('moves-counter');
  movesCounter.innerHTML = 0;
  where.insertAdjacentElement('beforeend', movesCounter);

  return movesCounter;
}

function createTimer(where) {
  const timer = document.createElement('span');
  timer.classList.add('timer');
  timer.innerHTML = 0;
  where.insertAdjacentElement('beforeend', timer);

  return timer;
}

function createRecordsTable(where) {
  const highScoreTable = document.createElement('ol');
  highScoreTable.classList.add('records-table');
  where.insertAdjacentElement('beforeend', highScoreTable);

  return highScoreTable;
}

function createSoundButton(where) {
  const soundButton = document.createElement('button');
  soundButton.classList.add('button', 'button_sound');
  soundButton.innerHTML = 'On';
  where.insertAdjacentElement('beforeend', soundButton);

  return soundButton;
}

function createThemeButton(where) {
  const themeButton = document.createElement('button');
  themeButton.classList.add('button', 'button_theme');
  themeButton.innerHTML = 'Light';
  where.insertAdjacentElement('beforeend', themeButton);

  return themeButton;
}

function createSizeSelect(where) {
  const sizeSelect = document.createElement('select');
  sizeSelect.classList.add('size-select');
  sizeSelect.innerHTML = `
    <option value="10">10x10</option>
    <option value="15">15x15</option>
    <option value="25">25x25</option>
  `;
  where.insertAdjacentElement('beforeend', sizeSelect);

  return sizeSelect;
}

function createBombsSlider(where) {
  const bombsSlider = document.createElement('div');
  bombsSlider.classList.add('bombs-slider');
  bombsSlider.innerHTML = `
    <input class="bombs-slider__input" type="range" min="1" max="99" value="1" step="1">
    <div class="bombs-slider__selected">1</div>
  `;

  where.insertAdjacentElement('beforeend', bombsSlider);
  return bombsSlider;
}

;// CONCATENATED MODULE: ./modules/matrix/aditionalFuncs.js
function getIndex(row, col, size) {
  return row * size + col;
}

const getRow = (index, size) => Math.floor(index / size);
const getCol = (index, size) => index % size;

function isValid(row, col, size) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

function getSurrCells(index, matrix) {
  const surrCells = [];

  const size = Math.sqrt(matrix.length);

  const row = getRow(index, size);
  const col = getCol(index, size);

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (isValid(row + i, col + j, size)) {
        surrCells.push(matrix[getIndex(row + i, col + j, size)]);
      }
    }
  }

  return surrCells;
}

function findButtonIndex(button, matrix) {
  return matrix.findIndex((cell) => cell.button === button);
}

function openCell(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const buttonCell = matrix[buttonIndex];

  if (button.classList.contains('cell_opened') || button.classList.contains('cell_flagged')) return true;

  buttonCell.status = 'opened';
  button.classList.add('cell_opened');
  // console.log(matrix);

  if (buttonCell.inner === 0) {
    button.innerHTML = '';

    const surrCells = getSurrCells(buttonIndex, matrix);
    surrCells.forEach((cell) => {
      openCell(cell.button, matrix);
    });
    return true;
  }

  if (buttonCell.inner === 'bomb') {
    button.classList.add('cell_exploded');
    return false;
  }

  button.innerHTML = buttonCell.inner;
  button.classList.add(`cell_${buttonCell.inner}`);
  return true;
}

function openAllCells(matrix) {
  matrix.forEach((cell) => {
    openCell(cell.button, matrix);
  });
}

function toggleFlag(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const cell = matrix[buttonIndex];
  if (button.classList.contains('cell_opened')) return;

  if (!button.classList.contains('cell_flagged')) {
    cell.status = 'flagged';
    button.classList.add('cell_flagged');
  } else {
    cell.status = null;
    button.classList.remove('cell_flagged');
  }
}

function openSurrCells(button, matrix) {
  const buttonIndex = findButtonIndex(button, matrix);
  const surrCells = getSurrCells(buttonIndex, matrix);

  const flaggedCellsAmount = surrCells.filter((cell) => cell.button.classList.contains('cell_flagged')).length;
  if (flaggedCellsAmount < matrix[buttonIndex].inner) return true;

  let isSafe = true;
  surrCells.forEach((cell) => {
    if (!openCell(cell.button, matrix)) isSafe = false;
  });

  return isSafe;
}

;// CONCATENATED MODULE: ./modules/matrix/createMatrix.js


function createMatrix(size, bombsAmount, buttonsArray, saveButton) {
  function countBombs(index, matrix) {
    const bombCells = getSurrCells(index, matrix).filter((cell) => cell.inner === 'bomb');
    return bombCells.length;
  }

  function addBombs(matrix, safeButton) {
    const newMatrix = [...matrix];

    const safeButtonIndex = findButtonIndex(safeButton, newMatrix);

    let saveCells = [];
    if (bombsAmount > matrix.length - 9) {
      saveCells.push(matrix[safeButtonIndex]);
    } else {
      saveCells = [...getSurrCells(safeButtonIndex, matrix)];
    }

    let minedCells = [...matrix].filter((cell) => !saveCells.includes(cell));
    minedCells = minedCells.sort(() => Math.random() - 0.5).slice(0, bombsAmount);

    minedCells.forEach((cell) => {
      const minedButtonIndex = findButtonIndex(cell.button, matrix);
      newMatrix[minedButtonIndex].inner = 'bomb';
    });
    return newMatrix;
  }

  function addInners(matrix) {
    const newMatrix = [...matrix];
    newMatrix.forEach((cell, index) => {
      if (cell.inner !== 'bomb') {
        cell.inner = countBombs(index, matrix);
      }
    });
    return newMatrix;
  }

  let matrix = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const cell = {
        row: i,
        col: j,
        button: buttonsArray[getIndex(i, j, size, size)],
      };

      matrix.push(cell);
    }
  }

  matrix = addBombs(matrix, saveButton);
  matrix = addInners(matrix);

  return matrix;
}

;// CONCATENATED MODULE: ./modules/saving-loading/removeSave.js
function removeSave() {
  localStorage.setItem('goodSave420', null);
  localStorage.setItem('goodMovesSave420', null);
  localStorage.setItem('goodBombsSave420', null);
  localStorage.setItem('goodTimeSave420', null);
}

;// CONCATENATED MODULE: ./modules/saving-loading/loadSave.js


function sendLoadEvent(from) {
  const load = new Event('loadsave', { bubbles: true });
  from.dispatchEvent(load);
}

function loadSave() {
  const buttonsArray = Array.from(document.querySelectorAll('.cell'));
  const save = JSON.parse(localStorage.getItem('goodSave420'));
  let matrixCopy = [];

  if (save) {
    matrixCopy = save.map((cell, index) => {
      const button = buttonsArray[index];
      cell.button = button;
      return cell;
    });

    matrixCopy.forEach((cell) => {
      if (cell.status === 'opened') {
        openCell(cell.button, matrixCopy);
      } else if (cell.status === 'flagged') {
        toggleFlag(cell.button, matrixCopy);
      }
    });
    sendLoadEvent(document);
    return matrixCopy;
  }

  return null;
}

;// CONCATENATED MODULE: ./modules/components/MinesweeperGame.js









function sendCountIncreaseEvent(from) {
  const change = new Event('increasecounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendCountDecreaseEvent(from) {
  const change = new Event('decreasecounter', { bubbles: true });
  from.dispatchEvent(change);
}

function sendInitEvent(from) {
  const init = new Event('init', { bubbles: true });
  from.dispatchEvent(init);
}

function sendMoveEvent(from) {
  const move = new Event('move', { bubbles: true });
  from.dispatchEvent(move);
}

function sendWinEvent(from) {
  const win = new Event('win', { bubbles: true });
  from.dispatchEvent(win);
}

function sendLossEvent(from) {
  const loss = new Event('loss', { bubbles: true });
  from.dispatchEvent(loss);
}

class MinesweeperGame {
  constructor(where) {
    this.where = where;
    this.matrix = null;
    this.field = null;
  }

  start(size, bombsAmount) {
    function isWin(matrix) {
      const openedSafeCells = matrix.filter((cell) => cell.status === 'opened' && cell.inner !== 'bomb');
      const safeCells = matrix.filter((cell) => cell.inner !== 'bomb');
      // console.log(openedSafeCells.length + ' : ' + safeCells.length);
      return openedSafeCells.length === safeCells.length;
    }

    this.field = createField(this.where, size);
    const buttonsArray = Array.from(this.field.querySelectorAll('.cell'));

    this.matrix = loadSave(this.matrix);

    this.field.addEventListener('click', (event) => {
      const button = event.target.closest('.cell');
      if (!button) return;

      if (!this.matrix) {
        this.matrix = createMatrix(size, bombsAmount, buttonsArray, button);
        sendInitEvent(document);
      }

      if (!button.classList.contains('cell_opened') && !button.classList.contains('cell_flagged')) {
        sendMoveEvent(button);
      }

      const isSafe = openCell(button, this.matrix);

      if (!isSafe) {
        sendLossEvent(document);
      } else if (isWin(this.matrix)) {
        sendWinEvent(document);
      }
    });

    this.field.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const button = event.target.closest('.cell');

      if (!this.matrix) {
        this.matrix = createMatrix(size, bombsAmount, buttonsArray, button);
        sendInitEvent(document);
      }

      if (!button || button.classList.contains('cell_opened') || button.disabled === true) return;

      sendMoveEvent(document);

      if (!button.classList.contains('cell_flagged')) {
        sendCountDecreaseEvent(document);
      } else {
        sendCountIncreaseEvent(document);
      }

      toggleFlag(button, this.matrix);
    });

    this.field.addEventListener('dblclick', (event) => {
      const button = event.target.closest('.cell');
      if (!button || button.classList.contains('cell_flagged')) return;

      sendMoveEvent(button);

      const isSafe = openSurrCells(button, this.matrix);

      if (!isSafe) {
        sendLossEvent(document);
      } else if (isWin(this.matrix)) {
        sendWinEvent(document);
      }
    });
  }

  restart(size, bombsAmount) {
    this.matrix = null;
    this.field.remove();
    this.field = null;
    removeSave();

    const movesCounter = document.querySelector('.moves-counter');
    movesCounter.innerHTML = 0;

    this.start(size, bombsAmount, this.where);
  }
}

;// CONCATENATED MODULE: ./modules/components/RemainingBombsCounter.js


class RemainingBombsCounter {
  constructor(amount, where) {
    this.amount = amount;
    this.node = createBombsCounter(where, amount);
  }

  increase() {
    this.amount += 1;
    this.node.innerHTML = this.amount;
  }

  decrease() {
    this.amount -= 1;
    this.node.innerHTML = this.amount;
  }

  load(newAmount) {
    this.amount = newAmount;
    this.node.innerHTML = this.amount;
  }
}

;// CONCATENATED MODULE: ./modules/components/MovesCounter.js


class MovesCounter {
  constructor(amount, where) {
    this.amount = amount;
    this.node = createMovesCounter(where);
  }

  increase() {
    this.amount += 1;
    this.node.innerHTML = this.amount;
  }

  load(newAmount) {
    this.amount = newAmount;
    this.node.innerHTML = this.amount;
  }
}

;// CONCATENATED MODULE: ./modules/components/Timer.js


class Timer {
  constructor(where) {
    this.node = createTimer(where);
    this.timerId = null;
    this.startTime = null;
  }

  start() {
    this.timerId = setInterval(() => {
      this.node.innerHTML = +this.node.innerHTML + 1;
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  load(newStart) {
    this.node.innerHTML = newStart;
  }
}

;// CONCATENATED MODULE: ./modules/formatDate.js
function formatDate(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}

;// CONCATENATED MODULE: ./modules/components/RecordsTable.js




class RecordsTable {
  constructor(where) {
    this.node = createRecordsTable(where);
    this.array = [];
  }

  addRecord(time, moves, date) {
    const formattedDate = formatDate(date);

    let timeString;
    if (+time % 10 === 1 && +time !== 11) {
      timeString = `${time} second`;
    } else {
      timeString = `${time} seconds`;
    }

    let movesString;
    if (+moves % 10 === 1 && +moves !== 11) {
      movesString = `${moves} move`;
    } else {
      movesString = `${moves} moves`;
    }

    const recordString = `${timeString}, ${movesString}, at ${formattedDate}`;
    this.array.push(recordString);
    this.array.sort((a, b) => {
      const aSeconds = +a.split(' ')[0];
      const bSeconds = +b.split(' ')[0];
      return aSeconds - bSeconds;
    });
    this.array = this.array.slice(0, 10);

    this.node.innerHTML = '';
    this.array.forEach((record) => {
      const recordNode = document.createElement('li');
      recordNode.classList.add('record');
      recordNode.innerHTML = record;
      this.node.insertAdjacentElement('beforeend', recordNode);
    });
  }

  load(array) {
    if (array) {
      this.array = array;
    } else {
      this.array = [];
    }

    this.array.forEach((record) => {
      const recordNode = document.createElement('li');
      recordNode.classList.add('record');
      recordNode.innerHTML = record;

      this.node.insertAdjacentElement('beforeend', recordNode);
    });
  }
}

;// CONCATENATED MODULE: ./modules/components/SoundButton.js


class SoundButton {
  constructor(where) {
    this.node = createSoundButton(where);
    this.state = true;
  }

  change() {
    this.state = !this.state;
    if (this.state) {
      this.node.innerHTML = 'On';
    } else {
      this.node.innerHTML = 'Off';
    }
  }
}

;// CONCATENATED MODULE: ./modules/components/ThemeButton.js


class ThemeButton {
  constructor(where) {
    this.node = createThemeButton(where);
    this.light = true;
  }

  change() {
    this.light = !this.light;
    if (this.light) {
      this.node.innerHTML = 'Light';
      document.body.classList.remove('dark');
    } else {
      this.node.innerHTML = 'Dark';
      document.body.classList.add('dark');
    }
  }
}

;// CONCATENATED MODULE: ./modules/end-funcs/winFunc.js
function winFunc(time, moves, recordsTable) {
  // alert(`Hooray! You found all mines in ${time} seconds and ${moves} moves`);
  const lossMessage = document.createElement('h2');
  lossMessage.classList.add('message', 'message_win');
  lossMessage.innerHTML = `Hooray! You found all mines in ${time} seconds and ${moves} moves.`;
  document.body.insertAdjacentElement('afterbegin', lossMessage);

  recordsTable.addRecord(time, moves, new Date());
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.setAttribute('disabled', true);
  });
}

;// CONCATENATED MODULE: ./modules/end-funcs/lossFunc.js


function lossFunc(matrix) {
  openAllCells(matrix);

  const lossMessage = document.createElement('h2');
  lossMessage.classList.add('message', 'message_loss');
  lossMessage.innerHTML = 'Game over. Try again.';
  document.body.insertAdjacentElement('afterbegin', lossMessage);

  document.querySelectorAll('.cell').forEach((cell) => {
    cell.setAttribute('disabled', true);
  });
}

;// CONCATENATED MODULE: ./modules/playAudio.js
function playAudio(audio) {
  if (document.querySelector('.button_sound').innerHTML === 'On') {
    audio.currentTime = 0;
    audio.play();
  }
}

;// CONCATENATED MODULE: ./modules/saving-loading/save.js
function save(matrix) {
  if (!matrix || document.querySelector('.message')) {
    localStorage.setItem('goodSave420', null);
  } else {
    localStorage.setItem('goodSave420', JSON.stringify(matrix));
  }
  localStorage.setItem('goodMovesSave420', document.querySelector('.moves-counter').innerHTML);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-counter').innerHTML);
  localStorage.setItem('goodTimeSave420', document.querySelector('.timer').innerHTML);

  let highScoreArray = Array.from(document.querySelectorAll('.record'));
  if (highScoreArray.length > 0) {
    highScoreArray = highScoreArray.map((record) => record.innerHTML);
    localStorage.setItem('goodHighScoreSave420', JSON.stringify(highScoreArray));
  } else {
    localStorage.setItem('goodHighScoreSave420', null);
  }

  localStorage.setItem('goodSoundSave420', document.querySelector('.button_sound').innerHTML);
  localStorage.setItem('goodThemeSave420', document.querySelector('.button_theme').innerHTML);
  localStorage.setItem('goodSizeSave420', document.querySelector('.size-select').value);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-slider__input').value);
}

;// CONCATENATED MODULE: ./assets/audio/flag.wav
const flag_namespaceObject = __webpack_require__.p + "assets/audio/flag.wav";
;// CONCATENATED MODULE: ./assets/audio/boom.wav
const boom_namespaceObject = __webpack_require__.p + "assets/audio/boom.wav";
;// CONCATENATED MODULE: ./assets/audio/win.wav
const win_namespaceObject = __webpack_require__.p + "assets/audio/win.wav";
;// CONCATENATED MODULE: ./assets/audio/reveal.wav
const reveal_namespaceObject = __webpack_require__.p + "assets/audio/reveal.wav";
;// CONCATENATED MODULE: ./index.js
























const flagAudio = new Audio(flag_namespaceObject);
const boomAudio = new Audio(boom_namespaceObject);
const winAudio = new Audio(win_namespaceObject);
const revealAudio = new Audio(reveal_namespaceObject);

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

const themeButton = new ThemeButton(document.querySelector('.menu__theme'));
themeButton.node.addEventListener('click', () => {
  themeButton.change();
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

  if (localStorage.getItem('goodThemeSave420') === 'Dark') {
    themeButton.change();
  }
});

/******/ })()
;