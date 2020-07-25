const Component = require('../Component');

class MAR extends Component {
  static get imageFile() {
    return 'img/cpnt/MAR.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Control', 23, 15);
    this.addInput('Input', 46, 7.5);
    this.addInput('Clock', 23, 0);
  }
}

customElements.define('cpnt-mar', MAR);

module.exports = MAR;
