import UintInput from '../UintInput.js';

class MemoryRange extends HTMLElement {
  get value() {
    return parseInt(this._input.value);
  }

  constructor(value, id, label) {
    super();

    this._input = new UintInput(value, 0, 0xFFFFFFFF, true);
    this._input.id = id;

    const inputLabel = document.createElement('label');
    inputLabel.textContent = label;
    inputLabel.setAttribute('for', id);

    this.append(inputLabel);
    this.append(this._input);
  }
}

customElements.define('memory-range', MemoryRange);

export default MemoryRange;
