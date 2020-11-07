import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');
const { readFileSync } = window.require('fs');

class OpenButton extends MenuButton {
  public constructor(computer: Computer) {
    const title = 'Abrir';
    const icon = 'images/menu/open.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const file = remote.dialog.showOpenDialogSync(window, {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
        properties: ['openFile'],
      });
      if (file) {
        const content = readFileSync(file[0], { encoding: 'utf8' });
        computer.deserialize(JSON.parse(content));
      }
    });
  }
}

customElements.define('open-button', OpenButton);

export default OpenButton;
