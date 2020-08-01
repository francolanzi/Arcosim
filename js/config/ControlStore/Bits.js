const UintInput = require('../UintInput');

class ControlStoreBits extends HTMLElement {
  get value() {
    return this._input.value;
  }

  constructor(bits) {
    super();

    this._input = new UintInput(bits, 1, 32, true);
    this.appendChild(this._input);

    const label = document.createElement('label');
    label.textContent = 'bits';
    label.setAttribute('for', 'bits');
    this.appendChild(label);
  }
}

customElements.define('cpnt-cs-bits', ControlStoreBits);

module.exports = ControlStoreBits;
