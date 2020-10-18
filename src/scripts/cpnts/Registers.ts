import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import RegistersInfo from '../ifaces/cpntInfo/RegistersInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Registers/Config.js';

class Registers extends Component {
  private readonly _registers: Array<number>;

  private readonly _decoderA: Input;
  private readonly _decoderB: Input;
  private readonly _decoderC: Input;
  private readonly _inputC: Input;
  private readonly _clock: Input;

  private readonly _outputA: Output;
  private readonly _outputB: Output;

  public get config(): Config {
    return new Config(this);
  }

  public get count(): number {
    return this._registers.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._registers = new Array(16).fill(0);

    this._decoderA = this.addInput('Posición A', 20.75, 0);
    this._decoderB = this.addInput('Posición B', 46.5, 0);
    this._decoderC = this.addInput('Posición C', 72.25, 0);
    this._inputC = this.addInput('Valor C', 0, 44.5);
    this._clock = this.addInput('Clock', 0, 19.75);

    this._outputA = this.addOutput('Valor A', 93, 28);
    this._outputB = this.addOutput('Valor B', 93, 61);
  }

  public run(time: number): boolean {
    const indexA = this.encode(this._decoderA.value);
    const indexB = this.encode(this._decoderB.value);
    const indexC = this.encode(this._decoderC.value);

    if (indexA >= 0 && indexA < this._registers.length) {
      this._outputA.value = this._registers[indexA];
    }

    if (indexB >= 0 && indexB < this._registers.length) {
      this._outputB.value = this._registers[indexB];
    }

    if (this._clock.value && indexC >= 0 && indexC < this._registers.length) {
      this._registers[indexC] = this._inputC.value;
    }

    return super.run(time);
  }

  private encode(decoded: number): number {
    let encoded = -1;
    while (decoded) {
      decoded = decoded >>> 1;
      encoded++;
    }
    return encoded;
  }

  public serialize(): RegistersInfo {
    const cpnt = <RegistersInfo> super.serialize();
    cpnt.registers = this._registers;
    return cpnt;
  }

  public deserialize(obj: RegistersInfo): void {
    if (obj.registers) {
      this._registers.length = 0;
      obj.registers.forEach((value, index) => {
        this.addRegister();
        this.setRegister(index, value);
      });
    }
  }

  public addRegister(): number {
    this._registers.push(0);
    return this._registers.length - 1;
  }

  public getRegister(index: number): number {
    return this._registers[index];
  }

  public setRegister(index: number, value: number): void {
    if (index >= 0 && index < this._registers.length) {
      this._registers[index] = value;
    }
  }

  public removeRegister(): number {
    this._registers.pop();
    return this._registers.length;
  }
}

class RegistersItem extends CpntItem {
  public get type(): string {
    return 'Registers';
  }

  public get image(): string {
    return 'images/cpnt/Registers.svg';
  }

  public get width(): number {
    return 94;
  }

  public get height(): number {
    return 90;
  }

  public cpnt(top: number, left: number): Component {
    return new Registers(this, top, left);
  }
}

customElements.define('cpnt-registers', Registers);
customElements.define('cpnt-item-registers', RegistersItem);

export { RegistersItem, Registers };
