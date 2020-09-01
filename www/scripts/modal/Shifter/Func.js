import UintInput from '../UintInput.js';
import CustomSelect from '../CustomSelect.js';

class ShifterFunc extends HTMLElement {
  get index() {
    return this._index;
  }

  get func() {
    return parseInt(this._func.value);
  }

  get value() {
    return parseInt(this._value.value);
  }

  constructor(index, func, value, supported) {
    super();

    this._index = index;

    this._func = new CustomSelect(func, supported);
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
