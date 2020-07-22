const Component = require('../Component');

class MIR extends Component {
  constructor() {
    super();

    this.addInput('Instruction');
    this.addInput('Clock');

    this.addOutput('AMUX');
    this.addOutput('COND');
    this.addOutput('ALU');
    this.addOutput('SH');
    this.addOutput('MBR');
    this.addOutput('MAR');
    this.addOutput('RDWR');
    this.addOutput('ENC');
    this.addOutput('C');
    this.addOutput('B');
    this.addOutput('A');
    this.addOutput('ADDR');
  }
}

module.exports = MIR;
