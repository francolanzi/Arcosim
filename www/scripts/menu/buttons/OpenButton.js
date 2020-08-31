import MenuButton from '../MenuButton.js';
const { remote } = window.require('electron');
const { readFileSync } = window.require('fs');

class OpenButton extends MenuButton {
  get file() {
    return this._file;
  }

  set file(file) {
    this._file = file;
  }

  constructor(computer) {
    const title = 'Abrir';
    const icon = 'images/menu/open.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const file = remote.dialog.showOpenDialogSync(window, {
        filters: [{ name: 'ArCoSim', extensions: ['arcosim'] }],
        properties: ['openFile'],
      });
      if (file) {
        this.file = file[0];
        const content = readFileSync(this.file, { encoding: 'utf8' });
        computer.deserialize(JSON.parse(content));
      }
    });
  }
}

customElements.define('open-button', OpenButton);

export default OpenButton;
