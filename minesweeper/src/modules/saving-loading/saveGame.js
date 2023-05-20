export default function saveGame(matrix) {
  if (!matrix) {
    localStorage.setItem('goodSave420', null);
  } else {
    localStorage.setItem('goodSave420', JSON.stringify(matrix));
  }
  localStorage.setItem('goodMovesSave420', document.querySelector('.moves-counter').innerHTML);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-counter').innerHTML);
  localStorage.setItem('goodTimeSave420', document.querySelector('.timer').innerHTML);

  let highScoreArray = Array.from(document.querySelectorAll('.record'));
  if (highScoreArray.length > 0) {
    console.log(highScoreArray);
    highScoreArray = highScoreArray.map((record) => record.innerHTML);
    localStorage.setItem('goodHighScoreSave420', JSON.stringify(highScoreArray));
  } else {
    localStorage.setItem('goodHighScoreSave420', null);
  }
}
