const Count = require('./Count');
const List = require('./List');

class RegistersConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const count = new Count(cpnt.count);
    this.appendChild(count);

    const list = new List(cpnt);
    this.appendChild(list);

    count.addEventListener('change', () => list.count = count.value);
  }
}

customElements.define('cpnt-registers-config', RegistersConfig);

module.exports = RegistersConfig;
