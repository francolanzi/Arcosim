import Cell from './Cell.js';

class Memory extends HTMLElement {
  constructor(cpnt) {
    super();

    this._cpnt = cpnt;
  }

  showCells(from, to) {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }

    for (let index = from; index <= to; index++) {
      const value = this._cpnt.getCell(index);
      const cell = new Cell(index, value);
      cell.addEventListener('change', () =>
        this._cpnt.setCell(cell.index, cell.value));
      this.append(cell);
    }
  }
}

customElements.define('memory-cells', Memory);

export default Memory;
