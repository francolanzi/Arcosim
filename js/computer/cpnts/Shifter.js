const Component = require('../Component');

class Shifter extends Component {
  constructor() {
    super();

    this.addInput('Input');
    this.addInput('Function');

    this.addOutput('Result');
  }
}

module.exports = Shifter;
