import UintInput from '../UintInput.js';

class RegistersCount extends HTMLElement {
  private readonly _input: UintInput;

  public get value (): number {
    return parseInt(this._input.value);
  }

  public constructor (count: number) {
    super();

    this._input = new UintInput(count, 1, 32, true);
    this._input.id = 'count';
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = 'registros';
    label.setAttribute('for', this._input.id);
    this.append(label);
  }
}

customElements.define('cpnt-registers-count', RegistersCount);

export default RegistersCount;
