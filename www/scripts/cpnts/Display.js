import Component from '../Component.js';

class Display extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Display.svg',
      width: 58,
      height: 46,
    };
  }

  get value() {
    return parseInt(this._display.textContent, 16);
  }

  set value(value) {
    this._display.textContent = value.toString(16).toUpperCase();
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._input = this.addInput('Entrada', 29, 0);

    this._output = this.addOutput('Salida', 29, 46);

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

customElements.define('cpnt-display', Display);

export default Display;
