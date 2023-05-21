import { openAllCells } from '../matrix/aditionalFuncs';

export default function lossFunc(matrix) {
  openAllCells(matrix);
  alert('Game over. Try again.');
}
