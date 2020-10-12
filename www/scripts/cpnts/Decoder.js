import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Decoder extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._encoded = this.addInput('Codificado', 77, 14.5);
    this._enable = this.addInput('Habilitar', 38.5, 0);
    this._clock = this.addInput('Clock', 38.5, 29);

    this._decoded = this.addOutput('Decodificado', 0, 14.5);

    this._enable.default = 1;
    this._clock.default = 1;
  }

  run() {
    if (this._clock.value && this._enable.value) {
      this._decoded.value = 1 << this._encoded.value;
    }

    return super.run();
  }
}

class DecoderItem extends CpntItem {
  get type() {
    return 'Decoder';
  }

  get image() {
    return 'images/cpnt/Decoder.svg';
  }

  get width() {
    return 78;
  }

  get height() {
    return 30;
  }

  cpnt(top, left) {
    return new Decoder(this, top, left);
  }
}

customElements.define('cpnt-decoder', Decoder);
customElements.define('cpnt-item-decoder', DecoderItem);

export default DecoderItem;
