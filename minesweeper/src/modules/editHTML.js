export function createField(where, width, height) {
  const field = document.createElement('div');
  field.classList.add('field');

  const button = document.createElement('button');
  button.classList.add('cell');

  field.innerHTML = button.outerHTML.repeat(width * height);
  where.insertAdjacentElement('afterbegin', field);

  return field;
}

export function createContainer(where) {
  const container = document.createElement('main');
  container.classList.add('container');
  where.insertAdjacentElement('afterbegin', container);

  return container;
}
