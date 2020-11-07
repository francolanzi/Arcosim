import { MicroInstructionRegister } from '../../cpnts/MicroInstructionRegister.js';
import Mask from './Mask.js';

class MicroInstructionRegisterList extends HTMLElement {
  private readonly _cpnt: MicroInstructionRegister;

  public constructor(cpnt: MicroInstructionRegister) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const mask = cpnt.getMask(index);

      if (mask) {
        const elem = new Mask(index, mask.name, mask.size);

        elem.addEventListener('change', () =>
          cpnt.setMask(elem.index, elem.name, elem.size));
        this.append(elem);
      }
    }
  }

  public addMask(): void {
    const index = this._cpnt.addMask('', 0);
    const elem = new Mask(index, '', 0);
    elem.addEventListener('change', () =>
      this._cpnt.setMask(elem.index, elem.name, elem.size));
    this.append(elem);
  }

  public removeMask(): void {
    if (this._cpnt.count > 1) {
      this._cpnt.removeMask();
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    }
  }
}

customElements.define('cpnt-mir-list', MicroInstructionRegisterList);

export default MicroInstructionRegisterList;
