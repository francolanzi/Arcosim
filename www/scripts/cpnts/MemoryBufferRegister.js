import Component from '../Component.js';

class MemoryBufferRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MemoryBufferRegister.svg',
      width: 47,
      height: 20,
    };
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._control = this.addInput('Control', 31, 19);
    this._rdwr = this.addInput('RDWR', 15, 19);
    this._clock = this.addInput('Clock', 23, 0);
    this._datain = this.addInput('Entrada de datos', 46, 15);
    this._busin = this.addInput('Bus de datos', 0, 4);

    this._dataout = this.addOutput('Salida de datos', 46, 4);
    this._busout = this.addOutput('Bus de datos', 0, 15);
  }

  run() {
    const read = (this._rdwr.value >> 1) & 1;
    const write = (this._rdwr.value >> 0) & 1;

    if (this._clock.value) {
      if (this._control.value) {
        this._dataout.value = this._datain.value;
      } else if (read) {
        this._dataout.value = this._busin.value;
      }

      if (write) {
        this._busout.value = this._dataout.value;
      }
    }

    return super.run();
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);

export default MemoryBufferRegister;
