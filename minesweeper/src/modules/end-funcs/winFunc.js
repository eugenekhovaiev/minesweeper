export default function winFunc(time, moves, recordsTable) {
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
