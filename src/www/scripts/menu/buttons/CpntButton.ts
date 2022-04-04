import Gallery from '../Gallery.js';
import MenuButton from '../MenuButton.js';

class CpntButton extends MenuButton {
  private readonly _gallery: Gallery;

  public get open (): boolean {
    return this.active;
  }

  public set open (value: boolean) {
    this._gallery.open = value;
    this.active = value;
  }

  public constructor (gallery: Gallery) {
    const title = 'Componentes';
    const icon = 'images/menu/cpnt.svg';

    super(title, icon);

    this._gallery = gallery;

    this.addEventListener('click', () => {
      this.open = !this._gallery.open;
    });
  }
}

customElements.define('cpnt-button', CpntButton);

export default CpntButton;
