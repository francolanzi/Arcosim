import Computer from '../../Computer.js';
import FileManager from '../../FileManager.js';
import MenuButton from '../MenuButton.js';

const { ipcRenderer } = window.require('electron');

class OpenButton extends MenuButton {
  public constructor (computer: Computer) {
    const title = 'Abrir';
    const icon = 'images/menu/open.svg';

    super(title, icon);

    this.addEventListener('click', async () => {
      const paths = await ipcRenderer.invoke('open-dialog', {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }],
        properties: ['openFile']
      });

      if (paths) {
        FileManager.open(computer, paths[0]);
      }
    });
  }
}

customElements.define('open-button', OpenButton);

export default OpenButton;
