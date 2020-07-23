const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'ControlStore';
const imageFile = 'img/cpnt/ControlStore.png';

class ControlStoreInstance extends CpntInstance {
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

    this.addInput('Number', 164, 0);

    this.addOutput('Instruction', 164, 63);
  }
}

class ControlStoreOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return ControlStoreInstance;
  }
}

customElements.define('control-store-instance', ControlStoreInstance);
customElements.define('control-store-original', ControlStoreOriginal);

module.exports = ControlStoreOriginal;
