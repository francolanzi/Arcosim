const Component = require('../Component');

class MAR extends Component {
  constructor() {
    super();

    this.addInput('Control');
    this.addInput('Input');
    this.addInput('Clock');
  }
}

module.exports = MAR;
