import { ControlStore } from '../../cpnts/ControlStore.js';
import Row from './Row.js';

class ControlStoreStore extends HTMLElement {
  public readonly cpnt: ControlStore;

  public get bits(): number {
    return this.cpnt.bits;
  }

  public set bits(bits: number) {
    this.cpnt.bits = bits;
    this.childNodes.forEach(child => {
      const row = <Row> child;
      row.bits = bits;
    });
  }

  public constructor(cpnt: ControlStore) {
    super();

    this.cpnt = cpnt;

    for (const instruction of cpnt.instructions) {
      this.append(this.newRow(instruction));
    }
  }

  private newRow(instruction: number): Row {
    const row = new Row(instruction, this.cpnt.bits);

    row.addEventListener('change', () => {
      this.cpnt.setInstruction(row.position, row.instruction);
    });

    row.addEventListener('addbefore', () => {
      this.cpnt.addInstruction(row.position, 0);
      row.insertAdjacentElement('beforebegin', this.newRow(0));
    });

    row.addEventListener('addafter', () => {
      this.cpnt.addInstruction(row.position + 1, 0);
      row.insertAdjacentElement('afterend', this.newRow(0));
    });

    row.addEventListener('remove', () => {
      if (this.cpnt.instructionCount > 1) {
        this.cpnt.removeInstruction(row.position);
        row.remove();
      }
    });

    return row;
  }
}

customElements.define('cpnt-cs-store', ControlStoreStore);

export default ControlStoreStore;
