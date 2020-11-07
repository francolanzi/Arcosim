import Menu from './Menu.js';
import Gallery from './Gallery.js';
import Computer from '../Computer.js';
import Component from '../Component.js';

class MenuLayer extends HTMLElement {
  public readonly computer: Computer;
  public readonly gallery: Gallery;
  public readonly menu: Menu;

  public constructor() {
    super();

    this.computer = new Computer();

    this.gallery = new Gallery(this.computer);
    this.menu = new Menu(this.computer, this.gallery);

    this.append(this.menu);
    this.append(this.gallery);

    this.style.pointerEvents = 'none';

    this.computer.addEventListener('add', ev => {
      const cpnt: Component = (<CustomEvent> ev).detail;
      cpnt.trash = this.menu.trashButton;
    });

    this.computer.addEventListener('run', () =>
      this.style.pointerEvents = 'all');

    this.computer.addEventListener('stop', () =>
      this.style.pointerEvents = 'none');

    this.computer.addEventListener('step', () =>
      this.style.pointerEvents = 'all');

    this.computer.addEventListener('pause', () =>
      this.style.pointerEvents = 'none');
  }
}

customElements.define('menu-layer', MenuLayer);

export default MenuLayer;
