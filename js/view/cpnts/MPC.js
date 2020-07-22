const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MPC';
const image = 'img/cpnt/MPC.png';

class MPCInstance extends CpntInstance {
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

    this.addInput('Next', 26.5, 0);
    this.addInput('Clock', 53, 11);

    this.addOutput('Current', 26.5, 22);
  }
}

class MPCOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get image() {
    return image;
  }

  static get instance() {
    return MPCInstance;
  }
}

customElements.define('mpc-instance', MPCInstance);
customElements.define('mpc-original', MPCOriginal);

module.exports = MPCOriginal;
