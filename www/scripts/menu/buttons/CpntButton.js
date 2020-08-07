const MenuButton = require('../MenuButton');

class CpntButton extends MenuButton {
  static get title() {
    return 'Componentes';
  }

  static get icon() {
    return 'images/menu/cpnt.svg';
  }

  get gallery() {
    return this._gallery;
  }

  set gallery(gallery) {
    this._gallery = gallery;
  }

  constructor() {
    super();

    this.addEventListener('click', () => {
      if (this.gallery) {
        this.gallery.open = !this.gallery.open;
        this.active = this.gallery.open;
      }
    });
  }
}

customElements.define('cpnt-button', CpntButton);

module.exports = CpntButton;
