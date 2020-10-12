import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Latch extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._input = this.addInput('Entrada', 31.5, 0);
    this._clock = this.addInput('Clock', 63, 9.5);

    this._output = this.addOutput('Salida', 31.5, 19);

    this._clock.default = 1;
  }

  run() {
    if (this._clock.value) {
      this._output.value = this._input.value;
    }

    return super.run();
  }
}

class LatchItem extends CpntItem {
  get type() {
    return 'Latch';
  }

  get image() {
    return 'images/cpnt/Latch.svg';
  }

  get width() {
    return 64;
  }

  get height() {
    return 20;
  }

  cpnt(top, left) {
    return new Latch(this, top, left);
  }
}

customElements.define('cpnt-latch', Latch);
customElements.define('cpnt-item-latch', LatchItem);

export default LatchItem;
