import Table from './Table.js';
import Bits from './Bits.js';
import { Store } from '../../cpnts/Store.js';

class StoreConfig extends HTMLElement {
  constructor(cpnt: Store) {
    super();

    const bits = new Bits(cpnt.bits);
    this.append(bits);

    const table = new Table(cpnt);
    this.append(table);

    bits.addEventListener('change', () => table.bits = bits.value);
  }
}

customElements.define('cpnt-store-config', StoreConfig);

export default StoreConfig;
