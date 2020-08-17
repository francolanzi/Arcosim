import Menu from './Menu.js';
import Gallery from './Gallery.js';

class MenuLayer extends HTMLElement {
  get menu() {
    return this._menu;
  }

  get gallery() {
    return this._gallery;
  }

  constructor(computer) {
    super();

    this._gallery = new Gallery();
    this._menu = new Menu(computer, this._gallery);

    this.append(this._menu);
    this.append(this._gallery);
  }
}

customElements.define('menu-layer', MenuLayer);

export default MenuLayer;
