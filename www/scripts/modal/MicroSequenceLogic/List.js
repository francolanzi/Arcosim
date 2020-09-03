import Cond from './Cond.js';

class MicroSequenceLogicList extends HTMLElement {
  get supported() {
    return this._cpnt.constructor.supported;
  }

  constructor(cpnt) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const cond = cpnt.getCondition(index);
      const elem = new Cond(index, cond, this.supported);
      elem.addEventListener('change', () =>
        cpnt.setCondition(elem.index, elem.cond));
      this.append(elem);
    }
  }

  addCondition() {
    const index = this._cpnt.addCondition(0);
    const elem = new Cond(index, 0, this.supported);
    elem.addEventListener('change', () =>
      this._cpnt.setCondition(elem.index, elem.cond));
    this.append(elem);
  }

  removeCondition() {
    if (this._cpnt.count > 1) {
      this._cpnt.removeCondition();
      this.removeChild(this.lastChild);
    }
  }
}

customElements.define('cpnt-msl-list', MicroSequenceLogicList);

export default MicroSequenceLogicList;
