import Table from './Table.js';
import Bits from './Bits.js';
import { ControlStore } from '../../cpnts/ControlStore.js';

class ControlStoreConfig extends HTMLElement {
  constructor(cpnt: ControlStore) {
    super();

    const bits = new Bits(cpnt.bits);
    this.append(bits);

    const table = new Table(cpnt);
    this.append(table);

    bits.addEventListener('change', () => table.bits = bits.value);
  }
}

customElements.define('cpnt-cs-config', ControlStoreConfig);

export default ControlStoreConfig;
