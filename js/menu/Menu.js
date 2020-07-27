const TrashButton = require('./items/TrashButton');
const LinkButton = require('./items/LinkButton');
const GalleryButton = require('./items/GalleryButton');

class Menu extends HTMLElement {
  constructor() {
    super();

    this._buttons = new Map();

    this.addButton('trash', new TrashButton());
    this.addButton('link', new LinkButton());
    this.addButton('gallery', new GalleryButton());
  }

  addButton(name, button) {
    if (!this._buttons.has(name)) {
      this._buttons.set(name, button);
      this.appendChild(button);
    }
    return this.getButton(name);
  }

  getButton(name) {
    return this._buttons.get(name);
  }

  removeButton(name) {
    return this._buttons.delete(name);
  }
}

customElements.define('main-menu', Menu);

module.exports = Menu;
