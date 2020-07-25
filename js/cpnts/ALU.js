const CpntOriginal = require('../CpntOriginal');
const CpntInstance = require('../CpntInstance');

const type = 'ALU';
const imageFile = 'img/cpnt/ALU.png';

class ALUInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('InputA', 11.5, 0);
    this.addInput('InputB', 69, 0);
    this.addInput('Function', 70, 29.5);

    this.addOutput('Result', 39.5, 44);
    this.addOutput('Control', 75, 14.5);
  }
}

class ALUOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return ALUInstance;
  }
}

customElements.define('alu-instance', ALUInstance);
customElements.define('alu-original', ALUOriginal);

module.exports = ALUOriginal;
