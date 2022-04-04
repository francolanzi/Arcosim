import UintInput from '../UintInput.js';

class MemoryRange extends HTMLElement {
  private readonly _from: UintInput;
  private readonly _to: UintInput;

  public get from (): number {
    return parseInt(this._from.value);
  }

  public get to (): number {
    return parseInt(this._to.value);
  }

  public constructor (from: number, to: number) {
    super();

    this._from = new UintInput(from, 0, 0xFFFFFFFF, true);
    this._from.id = 'cell-from';

    this._to = new UintInput(to, 0, 0xFFFFFFFF, true);
    this._to.id = 'cell-to';

    const fromLabel = document.createElement('label');
    fromLabel.textContent = 'Rango:';
    fromLabel.setAttribute('for', this._from.id);

    const toLabel = document.createElement('label');
    toLabel.textContent = '-';
    toLabel.setAttribute('for', this._to.id);

    this.append(fromLabel);
    this.append(this._from);
    this.append(toLabel);
    this.append(this._to);
  }
}

customElements.define('cpnt-memory-range', MemoryRange);

export default MemoryRange;
