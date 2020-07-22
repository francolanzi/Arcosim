const Component = require('../Component');

class Decoder extends Component {
  constructor() {
    super();

    this.addInput('Encoded');
    this.addInput('Enable');
    this.addInput('Clock');

    this.addOutput('Decoded');
  }
}

module.exports = Decoder;
