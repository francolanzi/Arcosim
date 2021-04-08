import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import MemoryData from '../ifaces/data/MemoryData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Memory/Config.js';

class Memory extends Component {
  private readonly _cells: Map<number, string>;

  private readonly _read: Input;
  private readonly _write: Input;
  private readonly _address: Input;
  private readonly _datain: Input;

  private readonly _dataout: Output;

  private _readStartTime: number;
  private _writeStartTime: number;

  public delay: number;

  public get config(): Config {
    return new Config(this);
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._cells = new Map();

    this._readStartTime = -1;
    this._writeStartTime = -1;

    this.delay = 0;

    this._read = this.addInput('read', 'Leer', 76.5, 63);
    this._write = this.addInput('write', 'Escribir', 87.5, 63);
    this._address = this.addInput('address', 'Dirección', 164, 63);
    this._datain = this.addInput('datain', 'Dato', 240.5, 63);

    this._dataout = this.addOutput('dataout', 'Dato', 251.5, 63);
  }

  public run(time: number): boolean {
    if (!this._read.value) {
      this._readStartTime = -1;
    } else {
      if (this._readStartTime < 0) {
        this._readStartTime = time;
      }
      if (this._readStartTime + this.delay <= time) {
        this._dataout.value = Number(this.getCell(this._address.value));
      }
    }
    if (!this._write.value) {
      this._writeStartTime = -1;
    } else {
      if (this._writeStartTime < 0) {
        this._writeStartTime = time;
      }
      if (this._writeStartTime + this.delay <= time) {
        this.setCell(this._address.value, this._datain.value.toString());
      }
    }

    return super.run(time);
  }

  public export(): MemoryData {
    return {
      delay: this.delay,
      cells: Array.from(this._cells.entries()),
    };
  }

  public import(data: MemoryData): void {
    this.delay = data.delay || 0;
    console.log(this.delay);
    if (data.cells) {
      this._cells.clear();
      data.cells.forEach(([address, data]) =>
        this.setCell(address, data));
    }
  }

  public getCell(address: number): string {
    const data = this._cells.get(address);
    return data ? data : '0';
  }

  public setCell(address: number, data: string): void {
    const number = Number(data);

    if (!isNaN(number)) {
      if (number) {
        this._cells.set(address, data);
      } else {
        this._cells.delete(address);
      }
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

  public get defaultLabel(): string {
    return 'Memory';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 327, 62);
  }

  public cpnt(top: number, left: number): Component {
    return new Memory(this, top, left);
  }
}

customElements.define('cpnt-memory', Memory);
customElements.define('cpnt-item-memory', MemoryItem);

export { MemoryItem, Memory };
