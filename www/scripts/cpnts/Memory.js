import Component from '../Component.js';
import Config from '../modal/Memory/Config.js';

class Memory extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Memory.svg',
      width: 329,
      height: 64,
    };
  }

  get config() {
    return new Config(this);
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._cells = new Map();

    this._rdwr = this.addInput('RDWR', 82, 63);
    this._address = this.addInput('Dirección', 164, 63);
    this._datain = this.addInput('Dato', 240.5, 63);

    this._dataout = this.addOutput('Dato', 251.5, 63);
  }

  run() {
    const read = (this._rdwr.value >> 1) & 1;
    const write = (this._rdwr.value >> 0) & 1;

    if (read) {
      this._dataout.value = this.getCell(this._address.value);
    }
    if (write) {
      this.setCell(this._address.value, this._datain.value);
    }

    return super.run();
  }

  getCell(address) {
    const data = this._cells.get(address);
    return data ? data : 0;
  }

  setCell(address, data) {
    if (data) {
      this._cells.set(address, data);
    } else {
      this._cells.delete(address);
    }
  }
}

customElements.define('cpnt-memory', Memory);

export default Memory;
