import Cell from './Cell.js';

class Memory extends HTMLElement {
  constructor(memory) {
    super();

    this._memory = memory;
  }

  showCells(from, to) {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }

    for (let index = from; index <= to; index++) {
      const value = this._memory.getCell(index);
      const cell = new Cell(index, value);
      cell.addEventListener('change', () =>
        this._memory.setCell(cell.index, cell.value));
      this.append(cell);
    }
  }
}

customElements.define('memory-cells', Memory);

export default Memory;
