const Component = require('../Component');

class Decoder extends Component {
  static get imageFile() {
    return 'images/cpnt/Decoder.png';
  }

  constructor(top, left) {
    super(top, left);

    this._encoded = this.addInput('Encoded', 77, 14.5);
    this._enable = this.addInput('Enable', 38.5, 0);
    this._clock = this.addInput('Clock', 38.5, 29);

    this._decoded = this.addOutput('Decoded', 0, 14.5);
  }

  run() {
    const clock = !this._clock.linked || this._clock.value;
    const enable = !this._enable.linked || this._enable.value;

    if (clock && enable) {
      this._decoded.value = 1 << this._encoded.value;
    }

    return super.run();
  }
}

customElements.define('cpnt-decoder', Decoder);

module.exports = Decoder;
