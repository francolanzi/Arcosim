import UintInput from '../UintInput.js';

class RegistersRegister extends HTMLElement {
  public readonly index: number;

  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(index: number, value: number) {
    super();

    this.index = index;

    this._input = new UintInput(value, 0, 0xFFFFFFFF, true);
    this._input.id = `register${index}`;
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = `Registro ${index} = `;
    label.setAttribute('for', this._input.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-registers-register', RegistersRegister);

export default RegistersRegister;
