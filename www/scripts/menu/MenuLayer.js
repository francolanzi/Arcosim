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

    this._gallery = new Gallery(computer);
    this._menu = new Menu(computer, this._gallery);

    this.append(this._menu);
    this.append(this._gallery);

    this.style.pointerEvents = 'none';

    computer.addEventListener('run', () =>
      this.style.pointerEvents = 'all');

    computer.addEventListener('stop', () =>
      this.style.pointerEvents = 'none');

    computer.addEventListener('step', () =>
      this.style.pointerEvents = 'all');

    computer.addEventListener('pause', () =>
      this.style.pointerEvents = 'none');
  }
}

customElements.define('menu-layer', MenuLayer);

export default MenuLayer;
