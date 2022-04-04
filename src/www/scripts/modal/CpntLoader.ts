import Component from '../Component.js';
import FileManager from '../FileManager.js';
import ImgButton from './ImgButton.js';

const { ipcRenderer } = window.require('electron');

class CpntLoader extends HTMLElement {
  public constructor (cpnt: Component) {
    super();

    const exportButton = new ImgButton('Exportar', 'images/modal/export.svg');
    const importButton = new ImgButton('Importar', 'images/modal/import.svg');

    this.append(exportButton);
    this.append(importButton);

    exportButton.addEventListener('click', async () => {
      const path = await ipcRenderer.invoke('save-dialog', {
        filters: [{ name: 'Componente', extensions: ['arcocpnt'] }]
      });

      if (path) {
        FileManager.export(cpnt, path);
        this.dispatchEvent(new Event('export'));
      }
    });

    importButton.addEventListener('click', async () => {
      const paths = await ipcRenderer.invoke('open-dialog', {
        filters: [{ name: 'Componente', extensions: ['arcocpnt'] }],
        properties: ['openFile']
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
