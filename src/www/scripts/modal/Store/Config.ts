import Table from './Table.js';
import Bits from './Bits.js';
import { Store } from '../../cpnts/Store.js';
import CpntConfig from '../CpntConfig.js';

class StoreConfig extends CpntConfig<Store> {
  public reload (): void {
    super.reload();

    const bits = new Bits(this.cpnt.bits);
    const table = new Table(this.cpnt);

    this.append(bits);
    this.append(table);

    bits.addEventListener('change', () => {
      table.bits = bits.value;
    });
  }
}

customElements.define('cpnt-store-config', StoreConfig);

export default StoreConfig;
