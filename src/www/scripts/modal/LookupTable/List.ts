import { LookupTable } from '../../cpnts/LookupTable.js';
import Value from './Value.js';

class LookupTableList extends HTMLElement {
  public readonly cpnt: LookupTable;

  private readonly _values: Map<number, Value>;

  public constructor (cpnt: LookupTable) {
    super();

    this.cpnt = cpnt;

    this._values = new Map();

    const table = [...cpnt.table];

    table.sort((row1, row2) =>
      Number(row1[0]) - Number(row2[0]));

    table.forEach(([key, value]) =>
      this.addValue(key, value));
  }

  public addValue (key: string, value: string): void {
    if (!this._values.has(Number(key))) {
      const elem = new Value(key, value);

      this.cpnt.setValue(key, value);
      this._values.set(Number(key), elem);
      this.append(elem);

      elem.addEventListener('change', () =>
        this.cpnt.setValue(elem.key, elem.value));

      elem.addEventListener('remove', () =>
        this.removeValue(elem.key));
    }
  }

  public removeValue (key: string): void {
    const elem = this._values.get(Number(key));

    if (elem) {
      this.cpnt.removeValue(key);
      this._values.delete(Number(key));
      this.removeChild(elem);
    }
  }
}

customElements.define('cpnt-lut-list', LookupTableList);

export default LookupTableList;
