import Memory from './Memory.js';
import Range from './Range.js';

class MemoryConfig extends HTMLElement {
  constructor(computer) {
    super();

    const from = new Range(0, 'cell-from', 'Desde:');
    const to = new Range(255, 'cell-to', 'Hasta:');
    const memory = new Memory(computer);

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
