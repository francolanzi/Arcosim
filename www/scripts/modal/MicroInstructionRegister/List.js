import Mask from './Mask.js';

class MicroInstructionRegisterList extends HTMLElement {
  constructor(cpnt) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const mask = cpnt.getMask(index);
      const elem = new Mask(index, mask.name, mask.size);
      elem.addEventListener('change', () =>
        cpnt.setMask(elem.index, elem.name, elem.size));
      this.append(elem);
    }
  }

  addMask() {
    const index = this._cpnt.addMask('', 0);
    const elem = new Mask(index, '', 0);
    elem.addEventListener('change', () =>
      this._cpnt.setMask(elem.index, elem.name, elem.size));
    this.append(elem);
  }

  removeMask() {
    this._cpnt.removeMask();
    this.removeChild(this.lastChild);
  }
}

customElements.define('cpnt-mir-list', MicroInstructionRegisterList);

export default MicroInstructionRegisterList;
