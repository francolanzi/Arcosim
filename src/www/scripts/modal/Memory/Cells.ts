import { Memory } from '../../cpnts/Memory.js';
import Cell from './Cell.js';

class MemoryCells extends HTMLElement {
  private readonly _cpnt: Memory;

  public constructor(cpnt: Memory) {
    super();

    this._cpnt = cpnt;
  }

  public showCells(from: number, to: number): void {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }

    for (let index = from; index <= to; index++) {
      const value = this._cpnt.getCell(index);
      const cell = new Cell(index, value);
      this.append(cell);
      cell.addEventListener('change', () => {
        this._cpnt.setCell(cell.index, cell.value);
        cell.value = this._cpnt.getCell(cell.index);
      });
    }
  }
}

customElements.define('memory-cells', MemoryCells);

export default MemoryCells;
