const Component = require('../Component');

class MUX extends Component {
  constructor() {
    super();

    this.addInput('InputA');
    this.addInput('InputB');
    this.addInput('Control');

    this.addOutput('Output');
  }
}

module.exports = MUX;
