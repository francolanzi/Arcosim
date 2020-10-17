import { Memory } from '../../cpnts/Memory.js';
import Cells from './Cells.js';
import Range from './Range.js';

class MemoryConfig extends HTMLElement {
  public constructor(cpnt: Memory) {
    super();

    const from = new Range(0, 'cell-from', 'Desde:');
    const to = new Range(255, 'cell-to', 'Hasta:');
    const memory = new Cells(cpnt);

    memory.showCells(from.value, to.value);

    this.append(from);
    this.append(to);
    this.append(memory);

    from.addEventListener('change', () =>
      memory.showCells(from.value, to.value));
    to.addEventListener('change', () =>
      memory.showCells(from.value, to.value));
  }
}

customElements.define('memory-config', MemoryConfig);

export default MemoryConfig;
