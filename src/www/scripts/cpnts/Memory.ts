import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import MemoryInfo from '../ifaces/cpntInfo/MemoryInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Memory/Config.js';

class Memory extends Component {
  private readonly _cells: Map<number, number>;

  private readonly _read: Input;
  private readonly _write: Input;
  private readonly _address: Input;
  private readonly _datain: Input;

  private readonly _dataout: Output;

  public get config(): Config {
    return new Config(this);
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._cells = new Map();

    this._read = this.addInput('read', 'Leer', 76.5, 63);
    this._write = this.addInput('write', 'Escribir', 87.5, 63);
    this._address = this.addInput('address', 'Dirección', 164, 63);
    this._datain = this.addInput('datain', 'Dato', 240.5, 63);

    this._dataout = this.addOutput('dataout', 'Dato', 251.5, 63);
  }

  public run(time: number): boolean {
    if (this._read.value) {
      this._dataout.value = this.getCell(this._address.value);
    }
    if (this._write.value) {
      this.setCell(this._address.value, this._datain.value);
    }

    return super.run(time);
  }

  public serialize(): MemoryInfo {
    const cpnt = <MemoryInfo> super.serialize();
    cpnt.cells = Array.from(this._cells.entries());
    return cpnt;
  }

  public deserialize(obj: MemoryInfo): void {
    if (obj.cells) {
      this._cells.clear();
      obj.cells.forEach(([address, data]) =>
        this.setCell(address, data));
    }
  }

  public getCell(address: number): number {
    const data = this._cells.get(address);
    return data ? data : 0;
  }

  public setCell(address: number, data: number): void {
    if (data) {
      this._cells.set(address, data);
    } else {
      this._cells.delete(address);
    }
  }
}

class MemoryItem extends CpntItem {
  public get type(): string {
    return 'Memory';
  }

  public get image(): string {
    return 'images/cpnt/Memory.svg';
  }

  public get width(): number {
    return 329;
  }

  public get height(): number {
    return 64;
  }

  public cpnt(top: number, left: number): Component {
    return new Memory(this, top, left);
  }
}

customElements.define('cpnt-memory', Memory);
customElements.define('cpnt-item-memory', MemoryItem);

export { MemoryItem, Memory };
