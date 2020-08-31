import Menu from './Menu.js';
import Gallery from './Gallery.js';
import Computer from '../Computer.js';

class MenuLayer extends HTMLElement {
  get computer() {
    return this._computer;
  }

  get menu() {
    return this._menu;
  }

  get gallery() {
    return this._gallery;
  }

  constructor() {
    super();

    this._computer = new Computer();

    this._gallery = new Gallery(this._computer);
    this._menu = new Menu(this._computer, this._gallery);

    this.append(this._menu);
    this.append(this._gallery);

    this.style.pointerEvents = 'none';

    this._computer.addEventListener('add', ev =>
      ev.detail.trash = this._menu.getButton('trash'));

    this._computer.addEventListener('run', () =>
      this.style.pointerEvents = 'all');

    this._computer.addEventListener('stop', () =>
      this.style.pointerEvents = 'none');

    this._computer.addEventListener('step', () =>
      this.style.pointerEvents = 'all');

    this._computer.addEventListener('pause', () =>
      this.style.pointerEvents = 'none');
  }
}

customElements.define('menu-layer', MenuLayer);

export default MenuLayer;
