const Component = require('../Component');

class MBR extends Component {
  static get imageFile() {
    return 'img/cpnt/MBR.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Control', 37, 15);
    this.addInput('RDWR', 9, 15);
    this.addInput('Input', 23, 15);
    this.addInput('Clock', 23, 0);

    this.addOutput('Output', 46, 7.5);
  }
}

customElements.define('cpnt-mbr', MBR);

module.exports = MBR;
