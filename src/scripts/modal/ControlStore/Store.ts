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

    function newRow(instruction: number): Row {
      const row = new Row(instruction, cpnt.bits);

      row.addEventListener('change', () => {
        cpnt.setInstruction(row.position, row.instruction);
      });

      row.addEventListener('addbefore', () => {
        cpnt.addInstruction(row.position, 0);
        row.insertAdjacentElement('beforebegin', newRow(0));
      });

      row.addEventListener('addafter', () => {
        cpnt.addInstruction(row.position + 1, 0);
        row.insertAdjacentElement('afterend', newRow(0));
      });

      row.addEventListener('remove', () => {
        if (cpnt.instructionCount > 1) {
          cpnt.removeInstruction(row.position);
          row.remove();
        }
      });

      return row;
    }

    for (const instruction of cpnt.instructions) {
      this.append(newRow(instruction));
    }
  }
}

customElements.define('cpnt-cs-store', ControlStoreStore);

export default ControlStoreStore;
