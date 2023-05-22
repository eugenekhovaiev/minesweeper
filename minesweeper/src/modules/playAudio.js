export default function playAudio(audio) {
  if (document.querySelector('.button_sound').innerHTML === 'On') {
    audio.currentTime = 0;
    audio.play();
  }
}
