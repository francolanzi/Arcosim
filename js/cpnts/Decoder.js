const Component = require('../Component');

class Decoder extends Component {
  static get imageFile() {
    return 'img/cpnt/Decoder.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Encoded', 77, 14.5);
    this.addInput('Enable', 38.5, 0);
    this.addInput('Clock', 38.5, 29);

    this.addOutput('Decoded', 0, 14.5);
  }
}

customElements.define('cpnt-decoder', Decoder);

module.exports = Decoder;
