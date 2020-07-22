const Component = require('../Component');

class MPC extends Component {
  constructor() {
    super();

    this.addInput('Next');
    this.addInput('Clock');

    this.addOutput('Current');
  }
}

module.exports = MPC;
