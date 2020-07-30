const Row = require('./Row');

class ControlStoreStore extends HTMLElement {
  get cpnt() {
    return this._cpnt;
  }

  get bits() {
    return this.cpnt.bits;
  }

  set bits(bits) {
    this.cpnt.bits = bits;
    this.childNodes.forEach(row => row.bits = bits);
  }

  constructor(cpnt) {
    super();

    this._cpnt = cpnt;

    function newRow(instruction) {
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
      this.appendChild(newRow(instruction));
    }
  }
}

customElements.define('control-store-store', ControlStoreStore);

module.exports = ControlStoreStore;
