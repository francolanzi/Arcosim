const UintInput = require('../UintInput');
const SVGButton = require('../SVGButton');
const CustomSelect = require('../CustomSelect');

class MicroSequenceLogicCond extends HTMLElement {
  get index() {
    return parseInt(this._index.value);
  }

  get cond() {
    return this._cond.value;
  }

  constructor(index, cond, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._cond = new CustomSelect(cond, supported);

    const remove = new SVGButton('img/modal/minus.svg');

    this.appendChild(this._index);
    this.appendChild(this._cond);
    this.appendChild(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-msl-cond', MicroSequenceLogicCond);

module.exports = MicroSequenceLogicCond;
