import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Display extends Component {
  get value() {
    return parseInt(this._display.textContent, 16);
  }

  set value(value) {
    value = value >>> 0;
    value = value.toString(16);
    value = value.toUpperCase();
    value = value.padStart(8, '0');
    this._display.textContent = value;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._input = this.addInput('Entrada', 49, 0);

    this._output = this.addOutput('Salida', 49, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this.value = this._output.value;
  }

  run() {
    this.value = this._input.value;
    this._output.value = this._input.value;

    return super.run();
  }

  reset() {
    super.reset();
    this.value = this._output.value;
  }
}

class DisplayItem extends CpntItem {
  get type() {
    return 'Display';
  }

  get image() {
    return 'images/cpnt/Display.svg';
  }

  get width() {
    return 99;
  }

  get height() {
    return 46;
  }

  cpnt(top, left) {
    return new Display(this, top, left);
  }
}

customElements.define('cpnt-display', Display);
customElements.define('cpnt-item-display', DisplayItem);

export default DisplayItem;
