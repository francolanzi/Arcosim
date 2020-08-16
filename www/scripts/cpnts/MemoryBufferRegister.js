const Component = require('../Component');

class MemoryBufferRegister extends Component {
  static get imageFile() {
    return 'images/cpnt/MemoryBufferRegister.svg';
  }

  static get imageWidth() {
    return 47;
  }

  static get imageHeight() {
    return 16;
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Control', 37, 15);
    this.addInput('RDWR', 9, 15);
    this.addInput('Input', 23, 15);
    this.addInput('Clock', 23, 0);

    this.addOutput('Output', 46, 7.5);
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);

module.exports = MemoryBufferRegister;
