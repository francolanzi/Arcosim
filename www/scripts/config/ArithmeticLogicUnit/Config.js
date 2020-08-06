const FuncList = require('./FuncList');

class ArithmeticLogicUnitConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const funcList = new FuncList(cpnt);

    this.append(funcList);
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

module.exports = ArithmeticLogicUnitConfig;
