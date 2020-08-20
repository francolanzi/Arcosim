import Component from '../Component.js';
import Config from '../modal/ControlStore/Config.js';

class ControlStore extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/ControlStore.svg',
      width: 329,
      height: 64,
    };
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

export default ControlStore;
