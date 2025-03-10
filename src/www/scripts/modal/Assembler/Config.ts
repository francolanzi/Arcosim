import { Assembler } from '../../cpnts/Assembler.js';
import CpntConfig from '../CpntConfig.js';
import Count from './Count.js';
import Label from './Label.js';
import List from './List.js';

class AssemblerConfig extends CpntConfig<Assembler> {
  public reload (): void {
    super.reload();

    const count = new Count();
    const msb = new Label('Most Significant Bit');
    const lsb = new Label('Less Significant Bit');
    const list = new List(this.cpnt);

    this.append(count);
    this.append(msb);
    this.append(list);
    this.append(lsb);

    count.addEventListener('add', () => list.addMask());
    count.addEventListener('remove', () => list.removeMask());
  }
}

customElements.define('cpnt-assembler-config', AssemblerConfig);

export default AssemblerConfig;
