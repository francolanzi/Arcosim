import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class MemoryAddressRegister extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._control = this.addInput('Control', 23, 19);
    this._clock= this.addInput('Clock', 23, 0);
    this._addrin = this.addInput('Dirección', 46, 9.5);

    this._addrout = this.addOutput('Bus de direcciones', 0, 9.5);
  }

  run() {
    if (this._clock.value) {
      if (this._control.value) {
        this._addrout.value = this._addrin.value;
      }
    }
    return super.run();
  }
}

class MemoryAddressRegisterItem extends CpntItem {
  get type() {
    return 'Memory Address Register';
  }

  get image() {
    return 'images/cpnt/MemoryAddressRegister.svg';
  }

  get width() {
    return 47;
  }

  get height() {
    return 20;
  }

  cpnt(top, left) {
    return new MemoryAddressRegister(this, top, left);
  }
}

customElements.define('cpnt-mar', MemoryAddressRegister);
customElements.define('cpnt-item-mar', MemoryAddressRegisterItem);

export default MemoryAddressRegisterItem;
