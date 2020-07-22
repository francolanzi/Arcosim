const Component = require('../Component');

class Increment extends Component {
  constructor() {
    super();

    this.addInput('Current');

    this.addOutput('Next');
  }
}

module.exports = Increment;
