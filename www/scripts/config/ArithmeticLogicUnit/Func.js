const UintInput = require('../UintInput');
const SVGButton = require('../SVGButton');
const CustomSelect = require('../CustomSelect');

class ArithmeticLogicUnitFunc extends HTMLElement {
  get position() {
    const childs = this.parentNode.childNodes;
    return Array.prototype.indexOf.call(childs, this);
  }

  get index() {
    return parseInt(this._index.value);
  }

  set index(index) {
    this._index.value = index;
  }

  get func() {
    return this._func.value;
  }

  constructor(index, func, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._func = new CustomSelect(func, supported);

    const remove = new SVGButton('www/images/modal/minus.svg');

    this.append(this._index);
    this.append(this._func);
    this.append(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-alu-func', ArithmeticLogicUnitFunc);

module.exports = ArithmeticLogicUnitFunc;
