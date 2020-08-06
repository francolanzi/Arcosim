const List = require('./List');

class ShifterConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-shifter-config', ShifterConfig);

module.exports = ShifterConfig;
