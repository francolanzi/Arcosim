import MenuButton from '../MenuButton.js';

class CpntButton extends MenuButton {
  get open() {
    return this.active;
  }

  set open(open) {
    this._gallery.open = open;
    this.active = open;
  }

  constructor(gallery) {
    const title = 'Componentes';
    const icon = 'images/menu/cpnt.svg';

    super(title, icon);

    this._gallery = gallery;

    this.addEventListener('click', () =>
      this.open = !this._gallery.open);
  }
}

customElements.define('cpnt-button', CpntButton);

export default CpntButton;
