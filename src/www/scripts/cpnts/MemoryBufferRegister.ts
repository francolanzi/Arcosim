import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import MemoryBufferRegisterData from '../ifaces/data/MemoryBufferRegisterData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/MemoryBufferRegister/Config.js';

class MemoryBufferRegister extends Component {
  private _value: number;
  private _bits: number;
  private _mask: number;

  private readonly _read: Input;
  private readonly _write: Input;
  private readonly _control: Input;
  private readonly _clock: Input;
  private readonly _datain: Input;
  private readonly _busin: Input;

  private readonly _dataout: Output;
  private readonly _busout: Output;

  public get config (): Config {
    return new Config(this);
  }

  public get value (): number {
    return this._value;
  }

  public get bits (): number {
    return this._bits;
  }

  public set bits (bits: number) {
    this._bits = Math.max(Math.min(bits, 32), 1);
    this._mask = 0xFFFFFFFF >>> (32 - bits);
    this._value &= this._mask;
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._value = 0;
    this._bits = 32;
    this._mask = 0xFFFFFFFF;

    this._read = this.addInput('read', 'Leer', 11.5, 19);
    this._write = this.addInput('write', 'Escribir', 23, 19);
    this._control = this.addInput('control', 'Control', 34.5, 19);
    this._clock = this.addInput('clock', 'Clock', 23, 0);
    this._datain = this.addInput('datain', 'Entrada de datos', 46, 15);
    this._busin = this.addInput('busin', 'Bus de datos', 0, 4);

    this._dataout = this.addOutput('dataout', 'Salida de datos', 46, 4);
    this._busout = this.addOutput('busout', 'Bus de datos', 0, 15);
  }

  public run (time: number): boolean {
    if (this._read.value) {
      this._value = this._busin.value;
    }

    if (this._clock.value) {
      if (this._control.value) {
        this._value = this._datain.value;
      }
    } else {
      this._dataout.value = this._value;
    }

    this._busout.value = this._write.value ? this._value : 0;

    return super.run(time);
  }

  public reset (): void {
    super.reset();
    this._value = 0;
  }

  public export (): MemoryBufferRegisterData {
    return {
      bits: this.bits
    };
  }

  public import (data: MemoryBufferRegisterData): void {
    if (data.bits) {
      this.bits = data.bits;
    }
  }
}

class MemoryBufferRegisterItem extends CpntItem {
  public get type (): string {
    return 'Memory Buffer Register';
  }

  public get image (): string {
    return 'images/cpnt/MemoryBufferRegister.svg';
  }

  public get width (): number {
    return 47;
  }

  public get height (): number {
    return 20;
  }

  public get defaultLabel (): string {
    return 'MBR';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 45, 18);
  }

  public cpnt (top: number, left: number): Component {
    return new MemoryBufferRegister(this, top, left);
  }
}

customElements.define('cpnt-mbr', MemoryBufferRegister);
customElements.define('cpnt-item-mbr', MemoryBufferRegisterItem);

export { MemoryBufferRegisterItem, MemoryBufferRegister };
