const Component = require('../Component');

class Latch extends Component {
  static get imageFile() {
    return 'img/cpnt/Latch.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Input', 31.5, 0);
    this.addInput('Clock', 63, 9.5);

    this.addOutput('Output', 31.5, 19);
  }
}

customElements.define('cpnt-latch', Latch);

module.exports = Latch;
