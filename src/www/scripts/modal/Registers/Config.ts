import { Registers } from '../../cpnts/Registers.js';
import Count from './Count.js';
import List from './List.js';

class RegistersConfig extends HTMLElement {
  public constructor(cpnt: Registers) {
    super();

    const count = new Count(cpnt.count);
    this.append(count);

    const list = new List(cpnt);
    this.append(list);

    count.addEventListener('change', () => list.count = count.value);
  }
}

customElements.define('cpnt-registers-config', RegistersConfig);

export default RegistersConfig;
