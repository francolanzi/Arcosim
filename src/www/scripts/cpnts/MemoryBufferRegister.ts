import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class MemoryBufferRegister extends Component {
  private readonly _read: Input;
  private readonly _write: Input;
  private readonly _control: Input;
  private readonly _clock: Input;
  private readonly _datain: Input;
  private readonly _busin: Input;

  private readonly _dataout: Output;
  private readonly _busout: Output;

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._read = this.addInput('read', 'Leer', 11.5, 19);
    this._write = this.addInput('write', 'Escribir', 23, 19);
    this._control = this.addInput('control', 'Control', 34.5, 19);
    this._clock = this.addInput('clock', 'Clock', 23, 0);
    this._datain = this.addInput('datain', 'Entrada de datos', 46, 15);
    this._busin = this.addInput('busin', 'Bus de datos', 0, 4);

    this._dataout = this.addOutput('dataout', 'Salida de datos', 46, 4);
    this._busout = this.addOutput('busout', 'Bus de datos', 0, 15);
  }

  public run(time: number): boolean {
    if (this._clock.value) {
      if (this._control.value) {
        this._dataout.value = this._datain.value;
      } else if (this._read.value) {
        this._dataout.value = this._busin.value;
      }

      if (this._write.value) {
        this._busout.value = this._dataout.value;
      }
    }

    return super.run(time);
  }

  public export(): undefined {
    return undefined;
  }

  public import(): void {
    // nothing
  }
}

class MemoryBufferRegisterItem extends CpntItem {
  public get type(): string {
    return 'Memory Buffer Register';
  }

  public get image(): string {
    return 'images/cpnt/MemoryBufferRegister.svg';
  }

  public get width(): number {
    return 47;
  }

  public get height(): number {
    return 20;
  }

  public get defaultLabel(): string {
    return 'MBR';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 45, 18);
  }

  public cpnt(top: number, left: number): Component {
    return new MemoryBufferRegister(this, top, left);
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);
customElements.define('cpnt-item-mbr', MemoryBufferRegisterItem);

export { MemoryBufferRegisterItem, MemoryBufferRegister };
