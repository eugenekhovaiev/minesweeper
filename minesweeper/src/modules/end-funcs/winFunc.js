export default function winFunc(time, moves, highScoreTable) {
  alert(`Hooray! You found all mines in ${time} seconds and ${moves} moves`);

  console.log(highScoreTable);
  highScoreTable.addRecord(time, moves, new Date());
}
