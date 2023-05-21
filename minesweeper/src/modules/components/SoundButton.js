import { createSoundButton } from '../edit-HTML';

export default class SoundButton {
  constructor(where) {
    this.node = createSoundButton(where);
    this.state = true;
  }

  change() {
    this.state = !this.state;
    if (this.state) {
      this.node.innerHTML = 'On';
    } else {
      this.node.innerHTML = 'Off';
    }
  }
}
