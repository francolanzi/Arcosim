const Store = require('./Store');
const Bits = require('./Bits');

class ControlStoreConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const bits = new Bits(cpnt.bits);
    this.appendChild(bits);

    const store = new Store(cpnt);
    this.appendChild(store);

    bits.addEventListener('change', () => store.bits = bits.value);
  }
}

customElements.define('cpnt-cs-config', ControlStoreConfig);

module.exports = ControlStoreConfig;
