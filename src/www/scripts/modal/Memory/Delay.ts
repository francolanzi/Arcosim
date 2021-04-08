import UintInput from '../UintInput.js';

class MemoryDelay extends HTMLElement {
  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(delay: number) {
    super();

    const leftLabel = document.createElement('label');
    leftLabel.textContent = 'Demora:';
    leftLabel.setAttribute('for', 'delay');
    this.append(leftLabel);

    this._input = new UintInput(delay, 0, 0xFFFFFFFF, true);
    this._input.id = 'delay';
    this.append(this._input);

    const rightLabel = document.createElement('label');
    rightLabel.textContent = 'subciclos';
    rightLabel.setAttribute('for', 'delay');
    this.append(rightLabel);
  }
}

customElements.define('memory-delay', MemoryDelay);

export default MemoryDelay;
