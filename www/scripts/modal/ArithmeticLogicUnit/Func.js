import CustomSelect from '../CustomSelect.js';

class ArithmeticLogicUnitFunc extends HTMLElement {
  get index() {
    return this._index;
  }

  get func() {
    return parseInt(this._func.value);
  }

  constructor(index, func, supported) {
    super();

    this._index = index;

    this._func = new CustomSelect(func, supported);
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
