import Component from '../Component.js';

class Multiplexer extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Multiplexer.svg',
      width: 62,
      height: 23,
    };
  }

  constructor(top, left) {
    super(top, left);

    this._inputA = this.addInput('A', 18.5, 0);
    this._inputB = this.addInput('B', 42.5, 0);
    this._control = this.addInput('Control', 61, 11);

    this._output = this.addOutput('Output', 30.5, 22);
  }

  run() {
    this._output.value = this._control.value ?
      this._inputB.value : this._inputA.value;

    return super.run();
  }
}

customElements.define('cpnt-mux', Multiplexer);

export default Multiplexer;
