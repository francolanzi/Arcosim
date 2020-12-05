import Grid from './Grid.js';
import Header from './Header.js';
import Store from './Store.js';
import { ControlStore } from '../../cpnts/ControlStore';
import { Splitter } from '../../cpnts/Splitter.js';
import Mask from '../../ifaces/Mask.js';

class ControlStoreTable extends HTMLElement {
  private _bits: number;

  private readonly _grid: Grid;
  private readonly _header: Header;
  private readonly _store: Store;

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    this._bits = bits;
    this._grid.bits = bits;
    this._header.bits = bits;
    this._store.bits = bits;
  }

  public constructor(cpnt: ControlStore) {
    super();

    const masks: Array<Mask> = [];
    const sizes: Array<number> = [];

    const output = cpnt.getOutput('instruction');

    if (output) {
      const links = output.links;

      let elem = links.next();

      while (!elem.done && (elem.value.input.cpnt.type !== 'Splitter')) {
        elem = links.next();
      }

      if (!elem.done) {
        const splitter = <Splitter> elem.value.input.cpnt;

        masks.push(...splitter.masks);
        sizes.push(...masks.map(mask => mask.size));
      }
    }

    this._grid = new Grid(sizes, cpnt.bits);
    this._header = new Header(masks, cpnt.bits);
    this._store = new Store(cpnt);

    this.append(this._grid);
    this.append(this._header);
    this.append(this._store);

    this._bits = cpnt.bits;
    this.bits = this._bits;
  }
}

customElements.define('cpnt-cs-table', ControlStoreTable);

export default ControlStoreTable;
