import ImgButton from '../ImgButton.js';

class LookupTableValue extends HTMLElement {
  public readonly key: string;

  private readonly _value: HTMLInputElement;

  public get value(): string {
    return this._value.value;
  }

  public constructor(key: string, value: string) {
    super();

    this.key = key;

    this._value = document.createElement('input');
    this._value.id = `value`;
    this._value.type = 'text';
    this._value.value = value;
    this.append(this._value);

    const remove = new ImgButton('Quitar', 'images/modal/minus.svg');
    this.append(remove);
    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));

    const arrow = document.createElement('div');
    arrow.textContent = '->';
    this.prepend(arrow);

    const label = document.createElement('label');
    label.setAttribute('for', this._value.id);
    label.textContent = key;
    this.prepend(label);
  }
}

customElements.define('cpnt-lut-value', LookupTableValue);

export default LookupTableValue;
