import Menu from './Menu.js';
import Gallery from './Gallery.js';

class MenuLayer extends HTMLElement {
  get computer() {
    return this._menu.computer;
  }

  set computer(computer) {
    this._menu.computer = computer;
  }

  get menu() {
    return this._menu;
  }

  get gallery() {
    return this._gallery;
  }

  constructor() {
    super();

    this._menu = new Menu();
    this._gallery = new Gallery();

    this._menu.gallery = this._gallery;

    this.append(this._menu);
    this.append(this._gallery);
  }
}

customElements.define('menu-layer', MenuLayer);

export default MenuLayer;
