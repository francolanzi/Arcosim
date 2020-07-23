const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Decoder';
const imageFile = 'img/cpnt/Decoder.png';

class DecoderInstance extends CpntInstance {
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

    this.addInput('Encoded', 77, 14.5);
    this.addInput('Enable', 38.5, 0);
    this.addInput('Clock', 38.5, 29);

    this.addOutput('Decoded', 0, 14.5);
  }
}

class DecoderOriginal extends CpntOriginal {
  static get type() {
    return type;
  }

  static get imageFile() {
    return imageFile;
  }

  static get instance() {
    return DecoderInstance;
  }
}

customElements.define('decoder-instance', DecoderInstance);
customElements.define('decoder-original', DecoderOriginal);

module.exports = DecoderOriginal;
