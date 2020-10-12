import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class MemoryBufferRegister extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._read = this.addInput('Leer', 11.5, 19);
    this._write = this.addInput('Escribir', 23, 19);
    this._control = this.addInput('Control', 34.5, 19);
    this._clock = this.addInput('Clock', 23, 0);
    this._datain = this.addInput('Entrada de datos', 46, 15);
    this._busin = this.addInput('Bus de datos', 0, 4);

    this._dataout = this.addOutput('Salida de datos', 46, 4);
    this._busout = this.addOutput('Bus de datos', 0, 15);
  }

  run() {
    if (this._clock.value) {
      if (this._control.value) {
        this._dataout.value = this._datain.value;
      } else if (this._read.value) {
        this._dataout.value = this._busin.value;
      }

      if (this._write.value) {
        this._busout.value = this._dataout.value;
      }
    }

    return super.run();
  }
}

class MemoryBufferRegisterItem extends CpntItem {
  get type() {
    return 'Memory Buffer Register';
  }

  get image() {
    return 'images/cpnt/MemoryBufferRegister.svg';
  }

  get width() {
    return 47;
  }

  get height() {
    return 20;
  }

  cpnt(top, left) {
    return new MemoryBufferRegister(this, top, left);
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);
customElements.define('cpnt-item-mbr', MemoryBufferRegisterItem);

export default MemoryBufferRegisterItem;
