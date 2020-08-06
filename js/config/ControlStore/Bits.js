const UintInput = require('../UintInput');

class ControlStoreBits extends HTMLElement {
  get value() {
    return this._input.value;
  }

  constructor(bits) {
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

customElements.define('cpnt-cs-bits', ControlStoreBits);

module.exports = ControlStoreBits;
