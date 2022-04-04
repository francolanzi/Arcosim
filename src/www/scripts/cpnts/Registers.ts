import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import RegistersData from '../ifaces/data/RegistersData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Registers/Config.js';

class Registers extends Component {
  private readonly _registers: Array<string>;
  private readonly _labels: Array<string>;

  private readonly _decoderA: Input;
  private readonly _decoderB: Input;
  private readonly _decoderC: Input;
  private readonly _inputC: Input;
  private readonly _clock: Input;

  private readonly _outputA: Output;
  private readonly _outputB: Output;

  public get config (): Config {
    return new Config(this);
  }

  public get count (): number {
    return this._registers.length;
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._registers = new Array<string>(16).fill('0');
    this._labels = new Array<string>(16).fill('Reg');

    this._decoderA = this.addInput('decoderA', 'Posición A', 20.75, 0);
    this._decoderB = this.addInput('decoderB', 'Posición B', 46.5, 0);
    this._decoderC = this.addInput('decoderC', 'Posición C', 72.25, 0);
    this._inputC = this.addInput('inputC', 'Valor C', 0, 44.5);
    this._clock = this.addInput('clock', 'Clock', 0, 19.75);

    this._outputA = this.addOutput('outputA', 'Valor A', 93, 28);
    this._outputB = this.addOutput('outputB', 'Valor B', 93, 61);
  }

  public run (time: number): boolean {
    const indexA = this.encode(this._decoderA.value);
    const indexB = this.encode(this._decoderB.value);
    const indexC = this.encode(this._decoderC.value);

    if (indexA >= 0 && indexA < this._registers.length) {
      this._outputA.value = Number(this._registers[indexA]) || 0;
    }

    if (indexB >= 0 && indexB < this._registers.length) {
      this._outputB.value = Number(this._registers[indexB]) || 0;
    }

    if (this._clock.value && indexC >= 0 && indexC < this._registers.length) {
      this._registers[indexC] = this._inputC.value.toString();
    }

    return super.run(time);
  }

  private encode (decoded: number): number {
    let encoded = -1;
    while (decoded) {
      decoded = decoded >>> 1;
      encoded++;
    }
    return encoded;
  }

  public export (): RegistersData {
    return {
      registers: this._registers,
      labels: this._labels
    };
  }

  public import (data: RegistersData): void {
    if (data.registers) {
      this._registers.length = 0;
      data.registers.forEach((value, index) => {
        this.addRegister();
        this.setRegister(index, value);
      });
      if (data.labels) {
        data.labels.forEach((label, index) =>
          this.setLabel(index, label));
      }
    }
  }

  public addRegister (): number {
    this._registers.push('0');
    this._labels.push('Reg');
    return this._registers.length - 1;
  }

  public getRegister (index: number): string {
    return this._registers[index];
  }

  public setRegister (index: number, value: string): void {
    if (index >= 0 && index < this._registers.length && !isNaN(Number(value))) {
      this._registers[index] = value;
    }
  }

  public removeRegister (): number {
    this._registers.pop();
    this._labels.pop();
    return this._registers.length;
  }

  public getLabel (index: number): string {
    return this._labels[index];
  }

  public setLabel (index: number, label: string): void {
    if (index >= 0 && index < this._labels.length) {
      this._labels[index] = label;
    }
  }
}

class RegistersItem extends CpntItem {
  public get type (): string {
    return 'Registers';
  }

  public get image (): string {
    return 'images/cpnt/Registers.svg';
  }

  public get width (): number {
    return 94;
  }

  public get height (): number {
    return 90;
  }

  public get defaultLabel (): string {
    return 'Registers';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 92, 88);
  }

  public cpnt (top: number, left: number): Component {
    return new Registers(this, top, left);
  }
}

customElements.define('cpnt-registers', Registers);
customElements.define('cpnt-item-registers', RegistersItem);

export { RegistersItem, Registers };
