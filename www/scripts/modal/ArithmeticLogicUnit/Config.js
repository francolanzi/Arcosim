import Count from './Count.js';
import List from './List.js';

class ArithmeticLogicUnitConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const count = new Count();
    const list = new List(cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addFunction());
    count.addEventListener('remove', () => list.removeFunction());
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

export default ArithmeticLogicUnitConfig;
