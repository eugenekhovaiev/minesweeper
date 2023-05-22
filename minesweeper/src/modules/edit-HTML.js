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
  where.insertAdjacentElement('afterend', field);

  return field;
}

export function createStartHTML() {
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

export function createRestartButton(where) {
  const restartButton = document.createElement('button');
  restartButton.classList.add('button', 'button_new-game');
  restartButton.innerHTML = 'New Game';
  where.insertAdjacentElement('beforeend', restartButton);

  return restartButton;
}

export function createBombsCounter(where, amount) {
  const bombCounter = document.createElement('span');
  bombCounter.classList.add('bombs-counter');
  bombCounter.innerHTML = amount;
  where.insertAdjacentElement('beforeend', bombCounter);

  return bombCounter;
}

export function createMovesCounter(where) {
  const movesCounter = document.createElement('span');
  movesCounter.classList.add('moves-counter');
  movesCounter.innerHTML = 0;
  where.insertAdjacentElement('beforeend', movesCounter);

  return movesCounter;
}

export function createTimer(where) {
  const timer = document.createElement('span');
  timer.classList.add('timer');
  timer.innerHTML = 0;
  where.insertAdjacentElement('beforeend', timer);

  return timer;
}

export function createRecordsTable(where) {
  const highScoreTable = document.createElement('ol');
  highScoreTable.classList.add('records-table');
  where.insertAdjacentElement('beforeend', highScoreTable);

  return highScoreTable;
}

export function createSoundButton(where) {
  const soundButton = document.createElement('button');
  soundButton.classList.add('button', 'button_sound');
  soundButton.innerHTML = 'On';
  where.insertAdjacentElement('beforeend', soundButton);

  return soundButton;
}

export function createThemeButton(where) {
  const themeButton = document.createElement('button');
  themeButton.classList.add('button', 'button_theme');
  themeButton.innerHTML = 'Light';
  where.insertAdjacentElement('beforeend', themeButton);

  return themeButton;
}

export function createSizeSelect(where) {
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

export function createBombsSlider(where) {
  const bombsSlider = document.createElement('div');
  bombsSlider.classList.add('bombs-slider');
  bombsSlider.innerHTML = `
    <input class="bombs-slider__input" type="range" min="1" max="99" value="1" step="1">
    <div class="bombs-slider__selected">1</div>
  `;

  where.insertAdjacentElement('beforeend', bombsSlider);
  return bombsSlider;
}
