import Store from './Store.js';
import Bits from './Bits.js';

class ControlStoreConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const bits = new Bits(cpnt.bits);
    this.append(bits);

    const store = new Store(cpnt);
    this.append(store);

    bits.addEventListener('change', () => store.bits = bits.value);
  }
}

customElements.define('cpnt-cs-config', ControlStoreConfig);

export default ControlStoreConfig;
