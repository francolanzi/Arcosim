const UintInput = require('../UintInput');

class RegistersCount extends HTMLElement {
  get value() {
    return this._input.value;
  }

  constructor(count) {
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

module.exports = RegistersCount;
