import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Config from '../modal/ControlStore/Config.js';

class ControlStore extends Component {
  get config() {
    return new Config(this);
  }

  get bits() {
    return this._bits;
  }

  set bits(bits) {
    const mask = (1 << bits) - 1;
    for (let i = 0; i < this._instructions.length; i++) {
      this._instructions[i] &= mask;
    }
    this._bits = bits;
  }

  get instructionCount() {
    return this._instructions.length;
  }

  get instructions() {
    return this._instructions.values();
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._instructions = [0];
    this._bits = 32;

    this._position = this.addInput('Posición', 164, 0);

    this._instruction = this.addOutput('Instrucción', 164, 63);
  }

  run() {
    const index = this._position.value;

    if (index < this._instructions.length) {
      this._instruction.value = this._instructions[index];
    } else {
      this.stop();
    }

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.bits = this.bits;
    cpnt.instructions = this._instructions;
    return cpnt;
  }

  deserialize(obj) {
    if (obj.instructions) {
      this._instructions = obj.instructions;
    }

    if (obj.bits) {
      this.bits = obj.bits;
    }
  }

  addInstruction(position, instruction) {
    this._instructions.splice(position, 0, instruction);
  }

  getInstruction(position) {
    return this._instructions[position];
  }

  setInstruction(position, instruction) {
    this._instructions[position] = instruction;
  }

  removeInstruction(position) {
    this._instructions.splice(position, 1);
  }
}

class ControlStoreItem extends CpntItem {
  get type() {
    return 'Control Store';
  }

  get image() {
    return 'images/cpnt/ControlStore.svg';
  }

  get width() {
    return 329;
  }

  get height() {
    return 64;
  }

  cpnt(top, left) {
    return new ControlStore(this, top, left);
  }
}

customElements.define('cpnt-cs', ControlStore);
customElements.define('cpnt-item-cs', ControlStoreItem);

export default ControlStoreItem;
