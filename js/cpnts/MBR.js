const CpntOriginal = require('../CpntOriginal');
const CpntInstance = require('../CpntInstance');

const type = 'MBR';
const imageFile = 'img/cpnt/MBR.png';

class MBRInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  get cpnt() {
    return super.cpnt;
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

class MBROriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return MBRInstance;
  }
}

customElements.define('mbr-instance', MBRInstance);
customElements.define('mbr-original', MBROriginal);

module.exports = MBROriginal;
