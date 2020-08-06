const List = require('./List');

class ArithmeticLogicUnitConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

module.exports = ArithmeticLogicUnitConfig;
