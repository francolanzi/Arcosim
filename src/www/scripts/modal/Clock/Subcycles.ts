import UintInput from '../UintInput.js';

class ClockSubcycles extends HTMLElement {
  private readonly _input: UintInput;

  public get value(): number {
    return parseInt(this._input.value);
  }

  public constructor(subcycles: number) {
    super();

    this._input = new UintInput(subcycles, 1, 8, true);
    this._input.id = 'subcycles';
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = 'subciclos';
    label.setAttribute('for', this._input.id);
    this.append(label);
  }
}

customElements.define('cpnt-clock-subcycles', ClockSubcycles);

export default ClockSubcycles;
