const Component = require('../Component');

class Clock extends Component {
  constructor() {
    super();

    this.addOutput('Subcycle1');
    this.addOutput('Subcycle2');
    this.addOutput('Subcycle3');
    this.addOutput('Subcycle4');
  }
}

module.exports = Clock;
