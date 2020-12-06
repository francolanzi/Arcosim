import Computer from '../../Computer.js';
import Serialization from '../../Serialization.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');

class OpenButton extends MenuButton {
  public constructor(computer: Computer) {
    const title = 'Abrir';
    const icon = 'images/menu/open.svg';

    super(title, icon);

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const paths = remote.dialog.showOpenDialogSync(window, {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
        properties: ['openFile'],
      });

      Serialization.deserialize(computer, paths[0]);
    });
  }
}

customElements.define('open-button', OpenButton);

export default OpenButton;
