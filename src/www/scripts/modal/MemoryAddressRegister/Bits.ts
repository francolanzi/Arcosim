import UintInput from '../UintInput.js';

class MemoryAddressRegisterBits extends HTMLElement {
  private readonly _input: UintInput;

  public get value (): number {
    return parseInt(this._input.value);
  }

  public constructor (bits: number) {
    super();

    this._input = new UintInput(bits, 1, 32, true);
    this._input.id = 'bits';
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = 'bits';
    label.setAttribute('for', 'bits');
    this.append(label);
  }
}

customElements.define('cpnt-mar-bits', MemoryAddressRegisterBits);

export default MemoryAddressRegisterBits;
