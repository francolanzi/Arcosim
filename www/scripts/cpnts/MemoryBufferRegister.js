import Component from '../Component.js';

class MemoryBufferRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MemoryBufferRegister.svg',
      width: 47,
      height: 16,
    };
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._control = this.addInput('Control', 37, 15);
    this._rdwr = this.addInput('RDWR', 9, 15);
    this._input = this.addInput('Entrada', 23, 15);
    this._clock = this.addInput('Clock', 23, 0);

    this._output = this.addOutput('Salida', 46, 7.5);
  }

  run() {
    this.computer.memory.read = (this._rdwr.value >> 1) & 1;
    this.computer.memory.write = (this._rdwr.value >> 0) & 1;

    if (this._clock.value) {
      if (this._control.value) {
        this._output.value = this._input.value;
      } else if (this.computer.memory.read) {
        this._output.value = this.computer.memory.data;
      }

      if (this.computer.memory.write) {
        this.computer.memory.data = this._output.value;
      }
    }

    return super.run();
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);

export default MemoryBufferRegister;
