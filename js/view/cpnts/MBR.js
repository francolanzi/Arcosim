const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MBR';
const image = 'img/cpnt/MBR.png';

class MBRInstance extends CpntInstance {
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

    this.addInput('Control', 37, 15);
    this.addInput('RDWR', 9, 15);
    this.addInput('Input', 23, 15);
    this.addInput('Clock', 23, 0);

    this.addOutput('Output', 46, 7.5);
  }
}

class MBROriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  static get instance() {
    return MBRInstance;
  }
}

customElements.define('mbr-instance', MBRInstance);
customElements.define('mbr-original', MBROriginal);

module.exports = MBROriginal;
