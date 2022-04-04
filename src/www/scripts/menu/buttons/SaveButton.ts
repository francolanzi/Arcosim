import Computer from '../../Computer.js';
import FileManager from '../../FileManager.js';
import MenuButton from '../MenuButton.js';

const { ipcRenderer } = window.require('electron');

class SaveButton extends MenuButton {
  public constructor (computer: Computer) {
    const title = 'Guardar';
    const icon = 'images/menu/save.svg';

    super(title, icon);

    this.addEventListener('click', async () => {
      const path = await ipcRenderer.invoke('save-dialog', {
        filters: [{ name: 'Arcosim', extensions: ['arcosim'] }]
      });

      if (path) {
        FileManager.save(computer, path);
      }
    });
  }
}

customElements.define('save-button', SaveButton);

export default SaveButton;
