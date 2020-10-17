import UintInput from '../UintInput.js';

class MemoryCell extends HTMLElement {
  public readonly index: number;

  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(index: number, value: number) {
    super();

    this.index = index;

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
