const Component = require('../Component');
const Config = require('../config/MicroInstructionRegister');

class MicroInstructionRegister extends Component {
  static get imageFile() {
    return 'img/cpnt/MicroInstructionRegister.png';
  }

  get config() {
    return new Config(this);
  }

  get maskCount() {
    return this._masks.length;
  }

  constructor(top, left) {
    super(top, left);

    this._bits = 0;
    this._masks = [];

    this.addInput('Instruction', 164.5, 0);
    this.addInput('Clock', 0, 21);

    this.addMask(0, '', 1);
  }

  addMask(position, name, size) {
    const output = this.addOutput(name, 0, 42);
    const mask = { output, size };
    this._masks.splice(position, 0, mask);
    this.makeMasks();
  }

  getMask(position) {
    const mask = this._masks[position];
    if (!mask) {
      return undefined;
    } else {
      const name = mask.output.name;
      const size = mask.size;
      return { name, size };
    }
  }

  setMask(position, name, size) {
    const mask = this._masks[position];
    if (mask) {
      mask.output.name = name;
      mask.size = size;
      this.makeMasks();
    }
  }

  removeMask(position) {
    const mask = this._masks[position];
    this.removeOutput(mask.output.id);
    this._masks.splice(position, 1);
    this.makeMasks();
  }

  makeMasks() {
    const space = 329 / (this._masks.length + 1);

    let x = 329;
    this._bits = 0;

    this._masks.forEach(mask => {
      x -= space;
      mask.output.x = x;

      mask.mask = -1 >>> (32 - mask.size);
      mask.mask = mask.mask << this._bits;

      this._bits += mask.size;
    });
  }
}

customElements.define('cpnt-mir', MicroInstructionRegister);

module.exports = MicroInstructionRegister;
