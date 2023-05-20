export default function playAudio(audio) {
  if (document.querySelector('.sound-button').innerHTML === 'On') {
    audio.currentTime = 0;
    audio.play();
  }
}
