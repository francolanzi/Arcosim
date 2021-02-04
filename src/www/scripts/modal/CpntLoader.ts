import Component from '../Component.js';
import FileManager from '../FileManager.js';
import ImgButton from './ImgButton.js';

const { remote } = window.require('electron');

class CpntLoader extends HTMLElement {
  public constructor(cpnt: Component) {
    super();

    const exportButton = new ImgButton('Exportar', 'images/modal/export.svg');
    const importButton = new ImgButton('Importar', 'images/modal/import.svg');

    this.append(exportButton);
    this.append(importButton);

    const window = remote.getCurrentWindow();

    exportButton.addEventListener('click', () => {
      const path = remote.dialog.showSaveDialogSync(window, {
        filters: [{ name: 'Componente', extensions: ['arcocpnt'] }],
      });

      if (path) {
        FileManager.export(cpnt, path);
        this.dispatchEvent(new Event('export'));
      }
    });

    importButton.addEventListener('click', () => {
      const paths = remote.dialog.showOpenDialogSync(window, {
        filters: [{ name: 'Componente', extensions: ['arcocpnt'] }],
        properties: ['openFile'],
      });

      if (paths) {
        FileManager.import(cpnt, paths[0]);
        this.dispatchEvent(new Event('import'));
      }
    });
  }
}

customElements.define('cpnt-loader', CpntLoader);

export default CpntLoader;
