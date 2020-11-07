import { Shifter } from '../../cpnts/Shifter.js';
import Count from './Count.js';
import List from './List.js';

class ShifterConfig extends HTMLElement {
  public constructor(cpnt: Shifter) {
    super();

    const count = new Count();
    const list = new List(cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addFunction());
    count.addEventListener('remove', () => list.removeFunction());
  }
}

customElements.define('cpnt-shifter-config', ShifterConfig);

export default ShifterConfig;
