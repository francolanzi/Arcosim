import Grid from './Grid.js';
import Header from './Header.js';
import List from './List.js';
import { Splitter } from '../../cpnts/Splitter.js';
import { Store } from '../../cpnts/Store';
import Mask from '../../ifaces/Mask.js';

class StoreTable extends HTMLElement {
  private _bits: number;

  private readonly _grid: Grid;
  private readonly _header: Header;
  private readonly _list: List;

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    this._bits = bits;
    this._grid.bits = bits;
    this._header.bits = bits;
    this._list.bits = bits;
  }

  public constructor(cpnt: Store) {
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
    this._list = new List(cpnt);

    this.append(this._grid);
    this.append(this._header);
    this.append(this._list);

    this._bits = cpnt.bits;
    this.bits = this._bits;
  }
}

customElements.define('cpnt-store-table', StoreTable);

export default StoreTable;
