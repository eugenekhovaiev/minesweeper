import { createThemeButton } from '../edit-HTML';

export default class ThemeButton {
  constructor(where) {
    this.node = createThemeButton(where);
    this.light = true;
  }

  change() {
    this.light = !this.light;
    if (this.light) {
      this.node.innerHTML = 'Light';
      document.body.classList.remove('dark');
    } else {
      this.node.innerHTML = 'Dark';
      document.body.classList.add('dark');
    }
  }
}
