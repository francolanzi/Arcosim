import List from './List.js';

class ShifterConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-shifter-config', ShifterConfig);

export default ShifterConfig;
