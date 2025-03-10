import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import LookupTableData from '../ifaces/data/LookupTableData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/LookupTable/Config.js';

class LookupTable extends Component {
  private readonly _table: Map<number, [string, string]>;

  private readonly _key: Input;

  private readonly _value: Output;

  public get config (): Config {
    return new Config(this);
  }

  public get table (): IterableIterator<[string, string]> {
    return this._table.values();
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._table = new Map();
    this._table.set(0, ['0', '']);

    this._key = this.addInput('key', 'Clave', 0, 44.5);

    this._value = this.addOutput('value', 'Valor', 93, 44.5);
  }

  public run (time: number): boolean {
    this._value.value = this.getValue(this._key.value);
    return super.run(time);
  }

  public export (): LookupTableData {
    return {
      table: [...this._table.values()]
    };
  }

  public import (data: LookupTableData): void {
    if (data.table) {
      this._table.clear();
      data.table.forEach(([key, value]) =>
        this.setValue(key, value));
    }
  }

  public setValue (key: number | string, value: number | string): void {
    this._table.set(Number(key), [key.toString(), value.toString()]);
  }

  public getValue (key: number | string): number {
    const elem = this._table.get(Number(key));
    return elem ? Number(elem[1]) : 0;
  }

  public removeValue (key: number | string): void {
    this._table.delete(Number(key));
  }
}

class LookupTableItem extends CpntItem {
  public get type (): string {
    return 'LookupTable';
  }

  public get image (): string {
    return 'images/cpnt/LookupTable.svg';
  }

  public get width (): number {
    return 94;
  }

  public get height (): number {
    return 90;
  }

  public get defaultLabel (): string {
    return 'Lookup Table';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 92, 88);
  }

  public cpnt (top: number, left: number): Component {
    return new LookupTable(this, top, left);
  }
}

customElements.define('cpnt-lut', LookupTable);
customElements.define('cpnt-item-lut', LookupTableItem);

export { LookupTable, LookupTableItem };
