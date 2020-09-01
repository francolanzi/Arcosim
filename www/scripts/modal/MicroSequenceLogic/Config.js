import Count from './Count.js';
import List from './List.js';

class MicroSequenceLogicConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const count = new Count();
    const list = new List(cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addCondition());
    count.addEventListener('remove', () => list.removeCondition());
  }
}

customElements.define('cpnt-msl-config', MicroSequenceLogicConfig);

export default MicroSequenceLogicConfig;
