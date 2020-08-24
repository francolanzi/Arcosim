import UintInput from '../UintInput.js';

class ConstValue extends HTMLElement {
  get value() {
    return parseInt(this._input.value);
  }

  constructor(value) {
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
