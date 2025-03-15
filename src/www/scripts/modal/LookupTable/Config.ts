import { LookupTable } from '../../cpnts/LookupTable.js';
import CpntConfig from '../CpntConfig.js';
import Default from './Default.js';
import Key from './Key.js';
import List from './List.js';

class LookupTableConfig extends CpntConfig<LookupTable> {
  public reload (): void {
    super.reload();

    const key = new Key();
    const list = new List(this.cpnt);
    const dflt = new Default(this.cpnt.default);

    this.append(key);
    this.append(list);
    this.append(dflt);

    key.addEventListener('add', () => {
      list.addValue(key.key, '');
      this.reload();
    });

    dflt.addEventListener('change', () => {
      this.cpnt.default = dflt.value;
    });
  }
}

customElements.define('cpnt-lut-config', LookupTableConfig);

export default LookupTableConfig;
