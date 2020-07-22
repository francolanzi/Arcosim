const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MIR';
const image = 'img/cpnt/MIR.png';

class MIRInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  get cpnt() {
    return super.cpnt;
  }

  set cpnt(cpnt) {
    super.cpnt = cpnt;

    this.addInput('Instruction', 164.5, 0);
    this.addInput('Clock', 0, 21);

    this.addOutput('AMUX', 21.08, 42);
    this.addOutput('COND', 47.15, 42);
    this.addOutput('ALU', 73.23, 42);
    this.addOutput('SH', 99.31, 42);
    this.addOutput('MBR', 125.39, 42);
    this.addOutput('MAR', 151.46, 42);
    this.addOutput('RDWR', 177.54, 42);
    this.addOutput('ENC', 203.62, 42);
    this.addOutput('C', 229.69, 42);
    this.addOutput('B', 255.77, 42);
    this.addOutput('A', 281.85, 42);
    this.addOutput('ADDR', 307.92, 42);
  }
}

class MIROriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  static get instance() {
    return MIRInstance;
  }
}

customElements.define('mir-instance', MIRInstance);
customElements.define('mir-original', MIROriginal);

module.exports = MIROriginal;
