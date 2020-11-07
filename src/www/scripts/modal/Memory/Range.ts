import UintInput from '../UintInput.js';

class MemoryRange extends HTMLElement {
  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(value: number, id: string, label: string) {
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
