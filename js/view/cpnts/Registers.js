const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Registers';
const image = 'img/cpnt/Registers.png';

class RegistersInstance extends CpntInstance {
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

    this.addInput('DecoderA', 20.75, 0);
    this.addInput('DecoderB', 46.5, 0);
    this.addInput('DecoderC', 72.25, 0);
    this.addInput('Input', 0, 44.5);
    this.addInput('Clock', 0, 19.75);

    this.addOutput('OutputA', 93, 28);
    this.addOutput('OutputB', 93, 61);
  }
}

class RegistersOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  static get instance() {
    return RegistersInstance;
  }
}

customElements.define('registers-instance', RegistersInstance);
customElements.define('registers-original', RegistersOriginal);

module.exports = RegistersOriginal;
