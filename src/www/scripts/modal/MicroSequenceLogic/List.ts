import { MicroSequenceLogic } from '../../cpnts/MicroSequenceLogic.js';
import Cond from './Cond.js';

class MicroSequenceLogicList extends HTMLElement {
  private readonly _cpnt: MicroSequenceLogic;

  public get supported(): Array<string> {
    return MicroSequenceLogic.supported;
  }

  public constructor(cpnt: MicroSequenceLogic) {
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

  public addCondition(): void {
    const index = this._cpnt.addCondition(0);
    const elem = new Cond(index, 0, this.supported);
    elem.addEventListener('change', () =>
      this._cpnt.setCondition(elem.index, elem.cond));
    this.append(elem);
  }

  public removeCondition(): void {
    if (this._cpnt.count > 1) {
      this._cpnt.removeCondition();
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    }
  }
}

customElements.define('cpnt-msl-list', MicroSequenceLogicList);

export default MicroSequenceLogicList;
