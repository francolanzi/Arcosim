import CustomSelect from '../CustomSelect.js';

class MicroSequenceLogicCond extends HTMLElement {
  public readonly index: number;

  private readonly _cond: CustomSelect;

  public get cond (): number {
    return parseInt(this._cond.value);
  }

  public constructor (index: number, cond: number, supported: Array<string>) {
    super();

    this.index = index;

    this._cond = new CustomSelect(cond, new Map(supported.entries()));
    this._cond.id = `condition${index}`;
    this.append(this._cond);

    const label = document.createElement('label');
    label.textContent = `${index} = `;
    label.setAttribute('for', this._cond.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-msl-cond', MicroSequenceLogicCond);

export default MicroSequenceLogicCond;
