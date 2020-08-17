import List from './List.js';

class ArithmeticLogicUnitConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

export default ArithmeticLogicUnitConfig;
