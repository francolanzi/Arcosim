const Component = require('../Component');
const Config = require('../config/ControlStore');

class ControlStore extends Component {
  static get imageFile() {
    return 'images/cpnt/ControlStore.png';
  }

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

  constructor(top, left) {
    super(top, left);

    this._instructions = [0];
    this._bits = 32;

    this._number = this.addInput('Number', 164, 0);

    this._instruction = this.addOutput('Instruction', 164, 63);
  }

  run() {
    const index = this._number.value;

    if (index < this._instructions.length) {
      this._instruction.value = this._instructions[index];
    } else {
      this.stop();
    }

    return super.run();
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

customElements.define('cpnt-cs', ControlStore);

module.exports = ControlStore;
