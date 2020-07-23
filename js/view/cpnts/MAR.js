const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MAR';
const imageFile = 'img/cpnt/MAR.png';

class MARInstance extends CpntInstance {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  get cpnt() {
    return super.cpnt;
  }

  set cpnt(cpnt) {
    super.cpnt = cpnt;

    this.addInput('Control', 23, 15);
    this.addInput('Input', 46, 7.5);
    this.addInput('Clock', 23, 0);
  }
}

class MAROriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return MARInstance;
  }
}

customElements.define('mar-instance', MARInstance);
customElements.define('mar-original', MAROriginal);

module.exports = MAROriginal;
