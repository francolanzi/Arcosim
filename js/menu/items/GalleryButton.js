const MenuButton = require('../MenuButton');

class GalleryButton extends MenuButton {
  static get title() {
    return 'Componentes';
  }

  static get icon() {
    return 'img/menu/gallery.svg';
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
      }
    });
  }
}

customElements.define('gallery-button', GalleryButton);

module.exports = GalleryButton;
