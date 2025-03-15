import { ArithmeticLogicUnit } from '../../cpnts/ArithmeticLogicUnit.js';
import Func from './Func.js';

class ArithmeticLogicUnitList extends HTMLElement {
  private readonly _cpnt: ArithmeticLogicUnit;

  public get supported (): Array<string> {
    return ArithmeticLogicUnit.supported;
  }

  public constructor (cpnt: ArithmeticLogicUnit) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const func = cpnt.getFunction(index);
      const elem = new Func(index, func, this.supported);
      elem.addEventListener('change', () =>
        cpnt.setFunction(elem.index, elem.func));
      this.append(elem);
    }
  }

  public addFunction (): void {
    const index = this._cpnt.addFunction(0);
    const elem = new Func(index, 0, this.supported);
    elem.addEventListener('change', () =>
      this._cpnt.setFunction(elem.index, elem.func));
    this.append(elem);
  }

  public removeFunction (): void {
    if (this._cpnt.count > 1) {
      this._cpnt.removeFunction();
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    }
  }
}

customElements.define('cpnt-alu-list', ArithmeticLogicUnitList);

export default ArithmeticLogicUnitList;
