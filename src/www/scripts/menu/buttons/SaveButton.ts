import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');
const { writeFileSync } = window.require('fs');

class SaveButton extends MenuButton {
  private _file: string | undefined;

  public constructor(computer: Computer) {
    const title = 'Guardar';
    const icon = 'images/menu/save.svg';

    super(title, icon);

    this._file = undefined;

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      if (!this._file) {
        this._file = remote.dialog.showSaveDialogSync(window, {
          filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
        });
      }

      if (this._file) {
        const content = JSON.stringify(computer.serialize());
        writeFileSync(this._file, content);
      }
    });
  }
}

customElements.define('save-button', SaveButton);

export default SaveButton;
