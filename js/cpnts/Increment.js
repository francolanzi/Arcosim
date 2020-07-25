const Component = require('../Component');

class Increment extends Component {
  static get imageFile() {
    return 'img/cpnt/Increment.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Current', 67, 11);

    this.addOutput('Next', 33.5, 0);
  }
}

customElements.define('cpnt-increment', Increment);

module.exports = Increment;
