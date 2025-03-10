import ImgButton from '../ImgButton.js';

class LookupTableKey extends HTMLElement {
  private readonly _key: HTMLInputElement;

  public get key (): string {
    return this._key.value;
  }

  public constructor () {
    super();

    this._key = document.createElement('input');
    this._key.type = 'text';
    this._key.placeholder = 'Clave';
    this.append(this._key);
    this._key.addEventListener('keypress', ev => {
      if (ev.key === 'Enter') {
        this.dispatchEvent(new Event('add'));
      }
    });

    const add = new ImgButton('Agregar', 'images/modal/plus.svg');
    this.append(add);
    add.addEventListener('click', () =>
      this.dispatchEvent(new Event('add')));
  }
}

customElements.define('cpnt-lut-key', LookupTableKey);

export default LookupTableKey;
