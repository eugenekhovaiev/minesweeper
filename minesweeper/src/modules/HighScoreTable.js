import { createHighScoreTable } from './edit-HTML';

import formatDate from './formatDate';

export default class HighScoreTable {
  constructor(where) {
    this.node = createHighScoreTable(where);
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
