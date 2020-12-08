import ImgButton from '../ImgButton.js';

class ShifterCount extends HTMLElement {
  public constructor() {
    super();

    const add = new ImgButton('Agregar', 'images/modal/plus.svg');
    const remove = new ImgButton('Quitar', 'images/modal/minus.svg');

    this.append(add);
    this.append(remove);

    add.addEventListener('click', () =>
      this.dispatchEvent(new Event('add')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-shifter-count', ShifterCount);

export default ShifterCount;
