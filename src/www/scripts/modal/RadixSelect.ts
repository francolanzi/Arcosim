import CustomSelect from './CustomSelect.js';

class RadixSelect extends HTMLElement {
  private readonly _radix: CustomSelect;

  public get radix (): number {
    return parseInt(this._radix.value);
  }

  public set radix (radix: number) {
    this._radix.value = radix.toString();
  }

  public constructor (radix: number) {
    super();

    this._radix = new CustomSelect(radix, new Map([
      [2, 'Binario'],
      [8, 'Octal'],
      [10, 'Decimal'],
      [16, 'Hexadecimal']
    ]));
    this._radix.id = 'const-radix';

    const label = document.createElement('label');
    label.textContent = 'Sistema = ';
    label.setAttribute('for', this._radix.id);

    this.append(label);
    this.append(this._radix);
  }
}

customElements.define('radix-select', RadixSelect);

export default RadixSelect;
