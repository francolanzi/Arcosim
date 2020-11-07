import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');
const { writeFileSync } = window.require('fs');

class SaveButton extends MenuButton {
  public constructor(computer: Computer) {
    const title = 'Guardar';
    const icon = 'images/menu/save.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const file = remote.dialog.showSaveDialogSync(window, {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
      });

      if (file) {
        const content = JSON.stringify(computer.serialize());
        writeFileSync(file, content);
      }
    });
  }
}

customElements.define('save-button', SaveButton);

export default SaveButton;
