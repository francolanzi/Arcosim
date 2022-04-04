import { Splitter } from '../../cpnts/Splitter.js';
import Mask from './Mask.js';

class SplitterList extends HTMLElement {
  private readonly _cpnt: Splitter;

  public constructor (cpnt: Splitter) {
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

  public addMask (): void {
    const index = this._cpnt.addMask('', 1);
    const elem = new Mask(index, '', 1);
    elem.addEventListener('change', () =>
      this._cpnt.setMask(elem.index, elem.name, elem.size));
    this.append(elem);
  }

  public removeMask (): void {
    if (this._cpnt.count > 1) {
      this._cpnt.removeMask();
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    }
  }
}

customElements.define('cpnt-splitter-list', SplitterList);

export default SplitterList;
