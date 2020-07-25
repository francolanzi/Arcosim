const TrashItem = require('./items/TrashItem');
const LinkItem = require('./items/LinkItem');
const GalleryItem = require('./items/GalleryItem');

class Menu extends HTMLElement {
  constructor() {
    super();

    this._items = new Map();

    this.addItem('trash', new TrashItem());
    this.addItem('link', new LinkItem());
    this.addItem('gallery', new GalleryItem());
  }

  addItem(id, item) {
    if (!this._items.has(id)) {
      this._items.set(id, item);
      this.appendChild(item);
    }
    return this.getItem(id);
  }

  getItem(id) {
    return this._items.get(id);
  }

  removeItem(id) {
    return this._items.delete(id);
  }
}

customElements.define('menu-items', Menu);

module.exports = Menu;
