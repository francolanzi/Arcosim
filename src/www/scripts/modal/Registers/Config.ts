import { Registers } from '../../cpnts/Registers.js';
import CpntConfig from '../CpntConfig.js';
import Count from './Count.js';
import List from './List.js';

class RegistersConfig extends CpntConfig<Registers> {
  public reload(): void {
    super.reload();

    const count = new Count(this.cpnt.count);
    const list = new List(this.cpnt);

    this.append(count);
    this.append(list);

    count.addEventListener('change', () => list.count = count.value);
  }
}

customElements.define('cpnt-registers-config', RegistersConfig);

export default RegistersConfig;
