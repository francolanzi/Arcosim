import Func from './Func.js';

class ShifterList extends HTMLElement {
  get supported() {
    return this._cpnt.constructor.supported;
  }

  constructor(cpnt) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const { func, value } = cpnt.getFunction(index);
      const elem = new Func(index, func, value, this.supported);
      elem.addEventListener('change', () =>
        cpnt.setFunction(elem.index, elem.func, elem.value));
      this.append(elem);
    }
  }

  addFunction() {
    const index = this._cpnt.addFunction(0, 0);
    const elem = new Func(index, 0, 0, this.supported);
    elem.addEventListener('change', () =>
      this._cpnt.setFunction(elem.index, elem.func, elem.value));
    this.append(elem);
  }

  removeFunction() {
    if (this._cpnt.count > 1) {
      this._cpnt.removeFunction();
      this.removeChild(this.lastChild);
    }
  }
}

customElements.define('cpnt-shifter-list', ShifterList);

export default ShifterList;
