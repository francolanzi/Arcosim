import Count from './Count.js';
import List from './List.js';

class RegistersConfig extends HTMLElement {
  constructor(cpnt) {
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
