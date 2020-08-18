import UintInput from '../UintInput.js';

class MemoryCell extends HTMLElement {
  get index() {
    return this._index;
  }

  get value() {
    return parseInt(this._input.value);
  }

  constructor(index, value) {
    super();

    this._index = index;

    this._input = new UintInput(value, 0, 0xFFFFFFFF, true);
    this._input.id = `cell${index}`;
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = `[${index.toString(16).padStart(4, '0')}]:`;
    label.setAttribute('for', this._input.id);
    this.prepend(label);
  }
}

customElements.define('memory-cell', MemoryCell);

export default MemoryCell;
