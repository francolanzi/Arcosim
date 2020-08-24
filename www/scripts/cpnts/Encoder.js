import Component from '../Component.js';

class Encoder extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Encoder.svg',
      width: 78,
      height: 30,
    };
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._decoded = this.addInput('Decodificado', 77, 14.5);
    this._enable = this.addInput('Habilitar', 38.5, 0);
    this._clock = this.addInput('Clock', 38.5, 29);

    this._encoded = this.addOutput('Codificado', 0, 14.5);

    this._enable.default = 1;
    this._clock.default = 1;
  }

  run() {
    if (this._clock.value && this._enable.value) {
      let decoded = this._decoded.value;
      let count = -1;

      while (decoded) {
        decoded = decoded >> 1;
        count++;
      }

      this._encoded.value = count;
    }

    return super.run();
  }
}

customElements.define('cpnt-encoder', Encoder);

export default Encoder;
