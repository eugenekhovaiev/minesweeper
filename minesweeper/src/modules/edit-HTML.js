export function createField(where, size) {
  const field = document.createElement('div');
  field.classList.add('field');

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
  restartButton.classList.add('restart');
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
