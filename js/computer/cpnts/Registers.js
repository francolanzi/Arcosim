const Component = require('../Component');

class Registers extends Component {
  constructor() {
    super();

    this.addInput('DecoderA');
    this.addInput('DecoderB');
    this.addInput('DecoderC');
    this.addInput('Input');
    this.addInput('Clock');

    this.addOutput('OutputA');
    this.addOutput('OutputB');
  }
}

module.exports = Registers;
