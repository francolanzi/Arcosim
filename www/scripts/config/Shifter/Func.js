const UintInput = require('../UintInput');
const SVGButton = require('../SVGButton');
const CustomSelect = require('../CustomSelect');

class ShifterFunc extends HTMLElement {
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

  get value() {
    return parseInt(this._value.value);
  }

  constructor(index, func, value, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._func = new CustomSelect(func, supported);
    this._value = new UintInput(value, 0, 32, true);

    const remove = new SVGButton('www/images/modal/minus.svg');

    this.append(this._index);
    this.append(this._func);
    this.append(this._value);
    this.append(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-shifter-func', ShifterFunc);

module.exports = ShifterFunc;
