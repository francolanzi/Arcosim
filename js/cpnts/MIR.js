const Component = require('../Component');

class MIR extends Component {
  static get imageFile() {
    return 'img/cpnt/MIR.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Instruction', 164.5, 0);
    this.addInput('Clock', 0, 21);

    this.addOutput('AMUX', 21.08, 42);
    this.addOutput('COND', 47.15, 42);
    this.addOutput('ALU', 73.23, 42);
    this.addOutput('SH', 99.31, 42);
    this.addOutput('MBR', 125.39, 42);
    this.addOutput('MAR', 151.46, 42);
    this.addOutput('RDWR', 177.54, 42);
    this.addOutput('ENC', 203.62, 42);
    this.addOutput('C', 229.69, 42);
    this.addOutput('B', 255.77, 42);
    this.addOutput('A', 281.85, 42);
    this.addOutput('ADDR', 307.92, 42);
  }
}

customElements.define('cpnt-mir', MIR);

module.exports = MIR;
