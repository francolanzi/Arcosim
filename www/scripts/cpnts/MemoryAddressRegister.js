const Component = require('../Component');

class MemoryAddressRegister extends Component {
  static get imageFile() {
    return 'images/cpnt/MemoryAddressRegister.svg';
  }

  static get imageWidth() {
    return 47;
  }

  static get imageHeight() {
    return 16;
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Control', 23, 15);
    this.addInput('Input', 46, 7.5);
    this.addInput('Clock', 23, 0);
  }
}

customElements.define('cpnt-mar', MemoryAddressRegister);

module.exports = MemoryAddressRegister;
