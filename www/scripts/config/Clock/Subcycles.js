const UintInput = require('../UintInput');

class ClockSubcycles extends HTMLElement {
  get value() {
    return this._input.value;
  }

  constructor(subcycles) {
    super();

    this._input = new UintInput(subcycles, 1, 8, true);
    this._input.id = 'subcycles';
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = 'subciclos';
    label.setAttribute('for', 'subcycles');
    this.append(label);
  }
}

customElements.define('cpnt-clock-subcycles', ClockSubcycles);

module.exports = ClockSubcycles;
