const List = require('./List');
const Label = require('./Label');

class MicroInstructionRegisterConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const msb = new Label('Most Significant Bit');
    const lsb = new Label('Less Significant Bit');
    const list = new List(cpnt);

    this.appendChild(msb);
    this.appendChild(list);
    this.appendChild(lsb);
  }
}

customElements.define('cpnt-mir-config', MicroInstructionRegisterConfig);

module.exports = MicroInstructionRegisterConfig;
