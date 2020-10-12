import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Encoder extends Component {
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
      let encoded = -1;

      while (decoded) {
        decoded = decoded >>> 1;
        encoded++;
      }

      this._encoded.value = encoded;
    }

    return super.run();
  }
}

class EncoderItem extends CpntItem {
  get type() {
    return 'Encoder';
  }

  get image() {
    return 'images/cpnt/Encoder.svg';
  }

  get width() {
    return 78;
  }

  get height() {
    return 30;
  }

  cpnt(top, left) {
    return new Encoder(this, top, left);
  }
}

customElements.define('cpnt-encoder', Encoder);
customElements.define('cpnt-item-encoder', EncoderItem);

export default EncoderItem;
