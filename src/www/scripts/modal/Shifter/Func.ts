import UintInput from '../UintInput.js';
import CustomSelect from '../CustomSelect.js';

class ShifterFunc extends HTMLElement {
  public readonly index: number;

  private readonly _func: CustomSelect;
  private readonly _value: UintInput;

  public get func (): number {
    return parseInt(this._func.value);
  }

  public get value (): number {
    return parseInt(this._value.value);
  }

  public constructor (index: number, func: number, value: number, supported: Array<string>) {
    super();

    this.index = index;

    this._func = new CustomSelect(func, new Map(supported.entries()));
    this._value = new UintInput(value, 0, 32, true);

    this.append(this._func);
    this.append(this._value);

    const label = document.createElement('label');
    label.textContent = `${index} = `;
    this.prepend(label);
  }
}

customElements.define('cpnt-shifter-func', ShifterFunc);

export default ShifterFunc;
