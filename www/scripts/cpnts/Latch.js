import Component from '../Component.js';

class Latch extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Latch.svg',
      width: 64,
      height: 20,
    };
  }

  constructor(top, left) {
    super(top, left);

    this._input = this.addInput('Entrada', 31.5, 0);
    this._clock = this.addInput('Clock', 63, 9.5);

    this._output = this.addOutput('Salida', 31.5, 19);
  }

  run() {
    if (this._clock.value) {
      this._output.value = this._input.value;
    }

    return super.run();
  }
}

customElements.define('cpnt-latch', Latch);

export default Latch;
