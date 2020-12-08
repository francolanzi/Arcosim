import { MicroSequenceLogic } from '../../cpnts/MicroSequenceLogic.js';
import CpntConfig from '../CpntConfig.js';
import Count from './Count.js';
import List from './List.js';

class MicroSequenceLogicConfig extends CpntConfig<MicroSequenceLogic> {
  public reload(): void {
    super.reload();

    const count = new Count();
    const list = new List(this.cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addCondition());
    count.addEventListener('remove', () => list.removeCondition());
  }
}

customElements.define('cpnt-msl-config', MicroSequenceLogicConfig);

export default MicroSequenceLogicConfig;
