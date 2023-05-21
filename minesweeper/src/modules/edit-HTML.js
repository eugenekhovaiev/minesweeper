export function createField(where, size) {
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
  where.insertAdjacentElement('beforeend', field);

  return field;
}

export function createContainer(where) {
  const container = document.createElement('main');
  container.classList.add('container');
  where.insertAdjacentElement('afterbegin', container);

  return container;
}

export function createRestartButton(where) {
  const restartButton = document.createElement('button');
  restartButton.classList.add('restart-button');
  restartButton.innerHTML = 'Restart';
  where.insertAdjacentElement('afterbegin', restartButton);

  return restartButton;
}

export function createBombsCounter(where) {
  const bombCounter = document.createElement('button');
  bombCounter.classList.add('bombs-counter');
  // bombCounter.innerHTML = bombsAmount;
  where.insertAdjacentElement('afterbegin', bombCounter);

  return bombCounter;
}

export function createMovesCounter(where) {
  const movesCounter = document.createElement('button');
  movesCounter.classList.add('moves-counter');
  movesCounter.innerHTML = 0;
  where.insertAdjacentElement('afterbegin', movesCounter);

  return movesCounter;
}

export function createTimer(where) {
  const timer = document.createElement('button');
  timer.classList.add('timer');
  timer.innerHTML = 0;
  where.insertAdjacentElement('afterbegin', timer);

  return timer;
}

export function createHighScoreTable(where) {
  const highScoreTable = document.createElement('ol');
  highScoreTable.classList.add('high-score-table');
  where.insertAdjacentElement('beforeend', highScoreTable);

  return highScoreTable;
}

export function createSoundButton(where) {
  const soundButton = document.createElement('button');
  soundButton.classList.add('sound-button');
  soundButton.innerHTML = 'On';
  where.insertAdjacentElement('afterbegin', soundButton);

  return soundButton;
}

export function createSizeSelect(where) {
  const sizeSelect = document.createElement('select');
  sizeSelect.classList.add('size-select');
  sizeSelect.innerHTML = `
  <option value="10">10x10</option>
  <option value="15">15x15</option>
  <option value="25">25x25</option>
  `;
  where.insertAdjacentElement('afterbegin', sizeSelect);

  return sizeSelect;
}
