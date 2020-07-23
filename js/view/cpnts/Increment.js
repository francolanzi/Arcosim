const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Increment';
const imageFile = 'img/cpnt/Increment.png';

class IncrementInstance extends CpntInstance {
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

    this.addInput('Current', 67, 11);

    this.addOutput('Next', 33.5, 0);
  }
}

class IncrementOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return IncrementInstance;
  }
}

customElements.define('increment-instance', IncrementInstance);
customElements.define('increment-original', IncrementOriginal);

module.exports = IncrementOriginal;
