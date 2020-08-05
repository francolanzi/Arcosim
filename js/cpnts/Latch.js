const Component = require('../Component');

class Latch extends Component {
  static get imageFile() {
    return 'img/cpnt/Latch.png';
  }

  constructor(top, left) {
    super(top, left);

    this._input = this.addInput('Input', 31.5, 0);
    this._clock = this.addInput('Clock', 63, 9.5);

    this._output = this.addOutput('Output', 31.5, 19);
  }

  run() {
    if (this._clock.value) {
      this._output.value = this._input.value;
    }

    return super.run();
  }
}

customElements.define('cpnt-latch', Latch);

module.exports = Latch;
