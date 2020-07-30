const Store = require('./Store');
const Bits = require('./Bits');

class ControlStoreConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const bits = new Bits(cpnt.bits);
    this.appendChild(bits);

    const store = new Store(cpnt);
    this.appendChild(store);

    bits.addEventListener('bits', ev => store.bits = ev.detail);
  }
}

customElements.define('control-store-config', ControlStoreConfig);

module.exports = ControlStoreConfig;
