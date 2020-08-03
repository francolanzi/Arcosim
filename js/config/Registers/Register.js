const UintInput = require('../UintInput');

class RegistersRegister extends HTMLElement {
  get index() {
    return this._index;
  }

  get value() {
    return this._input.value;
  }

  constructor(index, value) {
    super();

    this._index = index;

    this._input = new UintInput(value, 0, 0xFFFFFFFF, true);
    this._input.id = `register${index}`;
    this.appendChild(this._input);

    const label = document.createElement('label');
    label.textContent = `Registro ${index} = `;
    label.setAttribute('for', this._input.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-registers-register', RegistersRegister);

module.exports = RegistersRegister;
