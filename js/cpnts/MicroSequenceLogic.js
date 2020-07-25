const Component = require('../Component');

class MicroSequenceLogic extends Component {
  static get imageFile() {
    return 'img/cpnt/MicroSequenceLogic.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Condition', 61, 20.5);
    this.addInput('Control', 0, 20.5);

    this.addOutput('Jump', 30.5, 0);
  }
}

customElements.define('cpnt-micro-sequence-logic', MicroSequenceLogic);

module.exports = MicroSequenceLogic;
