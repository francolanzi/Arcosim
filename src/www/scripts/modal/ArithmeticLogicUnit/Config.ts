import { ArithmeticLogicUnit } from '../../cpnts/ArithmeticLogicUnit.js';
import CpntConfig from '../CpntConfig.js';
import Bits from './Bits.js';
import Count from './Count.js';
import List from './List.js';

class ArithmeticLogicUnitConfig extends CpntConfig<ArithmeticLogicUnit> {
  public reload(): void {
    super.reload();

    const bits = new Bits(this.cpnt.bits);
    const count = new Count();
    const list = new List(this.cpnt);

    this.append(bits);
    this.append(count);
    this.append(list);

    bits.addEventListener('change', () =>
      this.cpnt.bits = bits.value);

    count.addEventListener('add', () => list.addFunction());
    count.addEventListener('remove', () => list.removeFunction());
  }
}

customElements.define('cpnt-alu-config', ArithmeticLogicUnitConfig);

export default ArithmeticLogicUnitConfig;
