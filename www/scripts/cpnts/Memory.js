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

    this._read = this.addInput('Leer', 76.5, 63);
    this._write = this.addInput('Escribir', 87.5, 63);
    this._address = this.addInput('Dirección', 164, 63);
    this._datain = this.addInput('Dato', 240.5, 63);

    this._dataout = this.addOutput('Dato', 251.5, 63);
  }

  run() {
    if (this._read.value) {
      this._dataout.value = this.getCell(this._address.value);
    }
    if (this._write.value) {
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

  serialize() {
    const cpnt = super.serialize();
    cpnt.cells = Array.from(this._cells.entries());
    return cpnt;
  }

  deserialize(obj) {
    if (obj.cells) {
      this._cells = new Map(obj.cells);
    }
  }
}

customElements.define('cpnt-memory', Memory);

export default Memory;
