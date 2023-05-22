import { openAllCells } from '../matrix/aditionalFuncs';

export default function lossFunc(matrix) {
  openAllCells(matrix);

  const lossMessage = document.createElement('h2');
  lossMessage.classList.add('message', 'message_loss');
  lossMessage.innerHTML = 'Game over. Try again.';
  document.body.insertAdjacentElement('afterbegin', lossMessage);

  document.querySelectorAll('.cell').forEach((cell) => {
    cell.setAttribute('disabled', true);
  });
}
