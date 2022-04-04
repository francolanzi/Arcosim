import { Shifter } from '../../cpnts/Shifter.js';
import CpntConfig from '../CpntConfig.js';
import Count from './Count.js';
import List from './List.js';

class ShifterConfig extends CpntConfig<Shifter> {
  public reload (): void {
    super.reload();

    const count = new Count();
    const list = new List(this.cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addFunction());
    count.addEventListener('remove', () => list.removeFunction());
  }
}

customElements.define('cpnt-shifter-config', ShifterConfig);

export default ShifterConfig;
