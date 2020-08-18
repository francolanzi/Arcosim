import Cell from './Cell.js';

class Memory extends HTMLElement {
  constructor(computer) {
    super();

    this._computer = computer;
  }

  showCells(from, to) {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }

    for (let index = from; index <= to; index++) {
      const value = this._computer.getMemoryCell(index);
      const cell = new Cell(index, value);
      cell.addEventListener('change', () =>
        this._computer.setMemoryCell(cell.index, cell.value));
      this.append(cell);
    }
  }
}

customElements.define('memory-cells', Memory);

export default Memory;
