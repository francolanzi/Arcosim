import MaskName from './MaskName.js';
import UintInput from '../UintInput.js';

class MicroInstructionRegisterMask extends HTMLElement {
  get index() {
    return this._index;
  }

  get name() {
    return this._maskName.value;
  }

  get size() {
    return parseInt(this._maskSize.value);
  }

  constructor(index, name, size) {
    super();

    this._index = index;

    this._maskName = new MaskName(name);
    this._maskSize = new UintInput(size, 1, 32, true);

    this.append(this._maskName);
    this.append(this._maskSize);
  }
}

customElements.define('cpnt-mir-mask', MicroInstructionRegisterMask);

export default MicroInstructionRegisterMask;
