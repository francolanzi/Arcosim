const Component = require('../Component');

class Shifter extends Component {
  static get imageFile() {
    return 'img/cpnt/Shifter.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Input', 37.5, 0);
    this.addInput('Function', 75, 13.5);

    this.addOutput('Result', 37.5, 27);
  }
}

customElements.define('cpnt-shifter', Shifter);

module.exports = Shifter;
