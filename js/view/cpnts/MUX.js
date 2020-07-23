const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MUX';
const imageFile = 'img/cpnt/MUX.png';

class MUXInstance extends CpntInstance {
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

    this.addInput('InputA', 18.5, 0);
    this.addInput('InputB', 42.5, 0);
    this.addInput('Control', 61, 11);

    this.addOutput('Output', 30.5, 22);
  }
}

class MUXOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return MUXInstance;
  }
}

customElements.define('mux-instance', MUXInstance);
customElements.define('mux-original', MUXOriginal);

module.exports = MUXOriginal;
