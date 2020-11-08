import CustomSelect from '../CustomSelect.js';

class ArithmeticLogicUnitFunc extends HTMLElement {
  private readonly _func: CustomSelect;

  public readonly index: number;

  public get func(): number {
    return parseInt(this._func.value);
  }

  public constructor(index: number, func: number, supported: Array<string>) {
    super();

    this.index = index;

    this._func = new CustomSelect(func, new Map(supported.entries()));
    this._func.id = `function${index}`;
    this.append(this._func);

    const label = document.createElement('label');
    label.textContent = `${index} = `;
    label.setAttribute('for', this._func.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-alu-func', ArithmeticLogicUnitFunc);

export default ArithmeticLogicUnitFunc;
