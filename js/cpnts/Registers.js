const Component = require('../Component');

class Registers extends Component {
  static get imageFile() {
    return 'img/cpnt/Registers.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('DecoderA', 20.75, 0);
    this.addInput('DecoderB', 46.5, 0);
    this.addInput('DecoderC', 72.25, 0);
    this.addInput('Input', 0, 44.5);
    this.addInput('Clock', 0, 19.75);

    this.addOutput('OutputA', 93, 28);
    this.addOutput('OutputB', 93, 61);
  }
}

customElements.define('cpnt-registers', Registers);

module.exports = Registers;
