export default function saveGame(matrix) {
  if (!matrix) {
    localStorage.setItem('goodSave420', null);
  } else {
    localStorage.setItem('goodSave420', JSON.stringify(matrix));
  }
  localStorage.setItem('goodMovesSave420', document.querySelector('.moves-counter').innerHTML);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-counter').innerHTML);
  localStorage.setItem('goodTimeSave420', document.querySelector('.timer').innerHTML);
}
