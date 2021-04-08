import { Memory } from '../../cpnts/Memory.js';
import CpntConfig from '../CpntConfig.js';
import Cells from './Cells.js';
import Range from './Range.js';

class MemoryConfig extends CpntConfig<Memory> {
  public reload(): void {
    super.reload();

    const range = new Range(0, 255);
    const memory = new Cells(this.cpnt);

    memory.showCells(range.from, range.to);

    this.append(range);
    this.append(memory);

    range.addEventListener('change', () =>
      memory.showCells(range.from, range.to));
  }
}

customElements.define('memory-config', MemoryConfig);

export default MemoryConfig;
