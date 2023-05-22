export default function save(matrix) {
  if (!matrix || document.querySelector('.message')) {
    localStorage.setItem('goodSave420', null);
  } else {
    localStorage.setItem('goodSave420', JSON.stringify(matrix));
  }
  localStorage.setItem('goodMovesSave420', document.querySelector('.moves-counter').innerHTML);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-counter').innerHTML);
  localStorage.setItem('goodTimeSave420', document.querySelector('.timer').innerHTML);

  let highScoreArray = Array.from(document.querySelectorAll('.record'));
  if (highScoreArray.length > 0) {
    highScoreArray = highScoreArray.map((record) => record.innerHTML);
    localStorage.setItem('goodHighScoreSave420', JSON.stringify(highScoreArray));
  } else {
    localStorage.setItem('goodHighScoreSave420', null);
  }

  localStorage.setItem('goodSoundSave420', document.querySelector('.button_sound').innerHTML);
  localStorage.setItem('goodThemeSave420', document.querySelector('.button_theme').innerHTML);
  localStorage.setItem('goodSizeSave420', document.querySelector('.size-select').value);
  localStorage.setItem('goodBombsSave420', document.querySelector('.bombs-slider__input').value);
}
