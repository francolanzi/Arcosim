import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

const { remote } = window.require('electron');
const { readFileSync } = window.require('fs');

class OpenButton extends MenuButton {
  private _file: string | undefined;

  public constructor(computer: Computer) {
    const title = 'Abrir';
    const icon = 'images/menu/open.svg';

    super(title, icon);

    this._file = undefined;

    const window = remote.getCurrentWindow();

    this.addEventListener('click', () => {
      const file = remote.dialog.showOpenDialogSync(window, {
        filters: [{ name: 'ArCoSim', extensions: ['arcosim'] }],
        properties: ['openFile'],
      });
      if (file) {
        this._file = file[0];
        const content = readFileSync(this._file, { encoding: 'utf8' });
        computer.deserialize(JSON.parse(content));
      }
    });
  }
}

customElements.define('open-button', OpenButton);

export default OpenButton;
