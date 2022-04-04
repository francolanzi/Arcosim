import { Shifter } from '../../cpnts/Shifter.js';
import Func from './Func.js';

class ShifterList extends HTMLElement {
  private readonly _cpnt: Shifter;

  public get supported (): Array<string> {
    return Shifter.supported;
  }

  public constructor (cpnt: Shifter) {
    super();

    this._cpnt = cpnt;

    for (let index = 0; index < cpnt.count; index++) {
      const func = cpnt.getFunction(index);

      if (func) {
        const elem = new Func(index, func.func, func.value, this.supported);

        elem.addEventListener('change', () =>
          cpnt.setFunction(elem.index, elem.func, elem.value));
        this.append(elem);
      }
    }
  }

  public addFunction (): void {
    const index = this._cpnt.addFunction(0, 0);
    const elem = new Func(index, 0, 0, this.supported);
    elem.addEventListener('change', () =>
      this._cpnt.setFunction(elem.index, elem.func, elem.value));
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

customElements.define('cpnt-shifter-list', ShifterList);

export default ShifterList;
