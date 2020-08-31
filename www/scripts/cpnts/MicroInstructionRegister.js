import Component from '../Component.js';
import Config from '../modal/MicroInstructionRegister/Config.js';

class MicroInstructionRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MicroInstructionRegister.svg',
      width: 330,
      height: 43,
    };
  }

  get config() {
    return new Config(this);
  }

  get maskCount() {
    return this._masks.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._masks = [];

    this._instruction = this.addInput('Instrucción', 164.5, 0);
    this._clock = this.addInput('Clock', 0, 21);

    this._clock.default = 1;

    this.addMask(0, '', 1);
  }

  run() {
    if (this._clock.value) {
      let bits = 0;

      this._masks.forEach(mask => {
        let value = -1 >>> (32 - mask.size);
        value &= this._instruction.value >>> bits;
        mask.output.value = value;
        bits += mask.size;
      });
    }

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.masks = this._masks.map(mask => {
      return {
        name: mask.output.name,
        size: mask.size,
      };
    });
    return cpnt;
  }

  deserialize(obj) {
    if (obj.masks) {
      this._masks = [];
      obj.masks.forEach(({ name, size }, position) =>
        this.addMask(position, name, size));
    }
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
    this._masks.forEach(mask => {
      x -= space;
      mask.output.x = x;
    });
  }
}

customElements.define('cpnt-mir', MicroInstructionRegister);

export default MicroInstructionRegister;
