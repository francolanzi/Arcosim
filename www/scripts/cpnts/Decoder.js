import Component from '../Component.js';

class Decoder extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Decoder.svg',
      width: 78,
      height: 30,
    };
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._encoded = this.addInput('Codificado', 77, 14.5);
    this._enable = this.addInput('Habilitar', 38.5, 0);
    this._clock = this.addInput('Clock', 38.5, 29);

    this._decoded = this.addOutput('Decodificado', 0, 14.5);
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

export default Decoder;
