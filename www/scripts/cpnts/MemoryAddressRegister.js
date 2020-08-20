import Component from '../Component.js';

class MemoryAddressRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MemoryAddressRegister.svg',
      width: 47,
      height: 16,
    };
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._control = this.addInput('Control', 23, 15);
    this._address = this.addInput('Dirección', 46, 7.5);
    this._clock= this.addInput('Clock', 23, 0);
  }

  run() {
    if (this._control.value && this._clock.value) {
      this.computer.memory.address = this._address.value;
    }
    return super.run();
  }
}

customElements.define('cpnt-mar', MemoryAddressRegister);

export default MemoryAddressRegister;
