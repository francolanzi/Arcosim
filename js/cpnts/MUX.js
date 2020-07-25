const Component = require('../Component');

class MUX extends Component {
  static get imageFile() {
    return 'img/cpnt/MUX.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('InputA', 18.5, 0);
    this.addInput('InputB', 42.5, 0);
    this.addInput('Control', 61, 11);

    this.addOutput('Output', 30.5, 22);
  }
}

customElements.define('cpnt-mux', MUX);

module.exports = MUX;
