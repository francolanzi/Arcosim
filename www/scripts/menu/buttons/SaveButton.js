import MenuButton from '../MenuButton.js';
const { remote } = window.require('electron');
const { writeFileSync } = window.require('fs');

class SaveButton extends MenuButton {
  get file() {
    return this._file;
  }

  set file(file) {
    this._file = file;
  }

  constructor(computer) {
    const title = 'Guardar';
    const icon = 'images/menu/save.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      if (!this.file) {
        this.file = remote.dialog.showSaveDialogSync(window, {
          filters: [{ name: 'ArCoSim', extensions: ['arcosim'] }],
        });
      }

      if (this.file) {
        const content = JSON.stringify(computer.serialize());
        writeFileSync(this.file, content);
      }
    });
  }
}

customElements.define('save-button', SaveButton);

export default SaveButton;
