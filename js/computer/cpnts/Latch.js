const Component = require('../Component');

class Latch extends Component {
  constructor() {
    super();

    this.addInput('Input');
    this.addInput('Clock');

    this.addOutput('Output');
  }
}

module.exports = Latch;
