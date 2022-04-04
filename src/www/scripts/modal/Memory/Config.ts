import { Memory } from '../../cpnts/Memory.js';
import CpntConfig from '../CpntConfig.js';
import Cells from './Cells.js';
import Delay from './Delay.js';
import Range from './Range.js';

class MemoryConfig extends CpntConfig<Memory> {
  public reload (): void {
    super.reload();

    const delay = new Delay(this.cpnt.delay);
    const range = new Range(0, 255);
    const memory = new Cells(this.cpnt);

    memory.showCells(range.from, range.to);

    this.append(delay);
    this.append(range);
    this.append(memory);

    delay.addEventListener('change', () => {
      this.cpnt.delay = delay.value;
    });

    range.addEventListener('change', () =>
      memory.showCells(range.from, range.to));
  }
}

customElements.define('cpnt-memory-config', MemoryConfig);

export default MemoryConfig;
