import UintInput from '../UintInput.js';

class ConstValue extends HTMLElement {
  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(value: number) {
    super();

    this._input = new UintInput(value, 0, 0xFFFFFFFF, true);
    this._input.id = 'const-value';

    const label = document.createElement('label');
    label.textContent = 'Constante = ';
    label.setAttribute('for', this._input.id);

    this.append(label);
    this.append(this._input);
  }
}

customElements.define('cpnt-const-value', ConstValue);

export default ConstValue;
