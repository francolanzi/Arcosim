const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MicroSequenceLogic';
const image = 'img/cpnt/MicroSequenceLogic.png';

class MicroSequenceLogicInstance extends CpntInstance {
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

    this.addInput('Condition', 61, 20.5);
    this.addInput('Control', 0, 20.5);

    this.addOutput('Jump', 30.5, 0);
  }
}

class MicroSequenceLogicOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  static get instance() {
    return MicroSequenceLogicInstance;
  }
}

customElements.define('micro-sequence-logic-instance', MicroSequenceLogicInstance);
customElements.define('micro-sequence-logic-original', MicroSequenceLogicOriginal);

module.exports = MicroSequenceLogicOriginal;
