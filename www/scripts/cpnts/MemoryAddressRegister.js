import Component from '../Component.js';

class MemoryAddressRegister extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MemoryAddressRegister.svg',
      width: 47,
      height: 20,
    };
  }

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

customElements.define('cpnt-mar', MemoryAddressRegister);

export default MemoryAddressRegister;
