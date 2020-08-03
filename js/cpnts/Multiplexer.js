const Component = require('../Component');

class Multiplexer extends Component {
  static get imageFile() {
    return 'img/cpnt/Multiplexer.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('InputA', 18.5, 0);
    this.addInput('InputB', 42.5, 0);
    this.addInput('Control', 61, 11);

    this.addOutput('Output', 30.5, 22);
  }
}

customElements.define('cpnt-mux', Multiplexer);

module.exports = Multiplexer;
