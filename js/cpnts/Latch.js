const CpntOriginal = require('../CpntOriginal');
const CpntInstance = require('../CpntInstance');

const type = 'Latch';
const imageFile = 'img/cpnt/Latch.png';

class LatchInstance extends CpntInstance {
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

    this.addInput('Input', 31.5, 0);
    this.addInput('Clock', 63, 9.5);

    this.addOutput('Output', 31.5, 19);
  }
}

class LatchOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return LatchInstance;
  }
}

customElements.define('latch-instance', LatchInstance);
customElements.define('latch-original', LatchOriginal);

module.exports = LatchOriginal;
