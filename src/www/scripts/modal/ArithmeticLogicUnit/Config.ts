import { ArithmeticLogicUnit } from '../../cpnts/ArithmeticLogicUnit.js';
import CpntConfig from '../CpntConfig.js';
import Count from './Count.js';
import List from './List.js';

class ArithmeticLogicUnitConfig extends CpntConfig<ArithmeticLogicUnit> {
  public reload(): void {
    super.reload();

    const count = new Count();
    const list = new List(this.cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('add', () => list.addFunction());
    count.addEventListener('remove', () => list.removeFunction());
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

export default ArithmeticLogicUnitConfig;
