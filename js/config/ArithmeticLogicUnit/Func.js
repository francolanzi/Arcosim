const UintInput = require('../UintInput');
const SVGButton = require('../SVGButton');
const CustomSelect = require('../CustomSelect');

class ArithmeticLogicUnitFunc extends HTMLElement {
  get index() {
    return this._index.value;
  }

  get func() {
    return this._func.value;
  }

  constructor(index, func, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._func = new CustomSelect(func, supported);

    const remove = new SVGButton('img/modal/minus.svg');

    this.appendChild(this._index);
    this.appendChild(this._func);
    this.appendChild(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-alu-func', ArithmeticLogicUnitFunc);

module.exports = ArithmeticLogicUnitFunc;
