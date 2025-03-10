import { LookupTable } from '../../cpnts/LookupTable.js';
import CpntConfig from '../CpntConfig.js';
import Key from './Key.js';
import List from './List.js';

class LookupTableConfig extends CpntConfig<LookupTable> {
  public reload (): void {
    super.reload();

    const key = new Key();
    const list = new List(this.cpnt);

    this.append(key);
    this.append(list);

    key.addEventListener('add', () => {
      list.addValue(key.key, '');
      this.reload();
    });
  }
}

customElements.define('cpnt-lut-config', LookupTableConfig);

export default LookupTableConfig;
