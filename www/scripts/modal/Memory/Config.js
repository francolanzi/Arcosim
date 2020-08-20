import Memory from './Memory.js';
import Range from './Range.js';

class MemoryConfig extends HTMLElement {
  constructor(memory) {
    super();

    const from = new Range(0, 'cell-from', 'Desde:');
    const to = new Range(255, 'cell-to', 'Hasta:');
    const mem = new Memory(memory);

    mem.showCells(from.value, to.value);

    this.append(from);
    this.append(to);
    this.append(mem);

    from.addEventListener('change', () =>
      mem.showCells(from.value, to.value));
    to.addEventListener('change', () =>
      mem.showCells(from.value, to.value));
  }
}

customElements.define('memory-config', MemoryConfig);

export default MemoryConfig;
