import UintInput from '../UintInput.js';
import ImgButton from '../ImgButton.js';
import CustomSelect from '../CustomSelect.js';

class MicroSequenceLogicCond extends HTMLElement {
  get position() {
    const childs = this.parentNode.childNodes;
    return Array.prototype.indexOf.call(childs, this) - 1;
  }

  get index() {
    return parseInt(this._index.value);
  }

  set index(index) {
    this._index.value = index;
  }

  get cond() {
    return parseInt(this._cond.value);
  }

  constructor(index, cond, supported) {
    super();

    this._index = new UintInput(index, 0, 0xFFFFFFFF, false);
    this._cond = new CustomSelect(cond, supported);

    const remove = new ImgButton('images/modal/minus.svg');

    this.append(this._index);
    this.append(this._cond);
    this.append(remove);

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-msl-cond', MicroSequenceLogicCond);

export default MicroSequenceLogicCond;
