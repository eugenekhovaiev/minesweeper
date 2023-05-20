export default function winFunc(time, moves, highScoreTable) {
  alert(`Hooray! You found all mines in ${time} seconds and ${moves} moves`);

  highScoreTable.addRecord(time, moves, new Date());
}
