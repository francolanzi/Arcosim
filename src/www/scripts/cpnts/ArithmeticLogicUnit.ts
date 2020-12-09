import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ArithmeticLogicUnitData from '../ifaces/data/ArithmeticLogicUnitData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/ArithmeticLogicUnit/Config.js';

class ArithmeticLogicUnit extends Component {
  private readonly _functions: Array<number>;

  private readonly _inputA: Input;
  private readonly _inputB: Input;
  private readonly _function: Input;

  private readonly _result: Output;
  private readonly _controlN: Output;
  private readonly _controlZ: Output;

  public static get supported(): Array<string> {
    return [
      'A + B', // 0
      'A - B', // 1
      'A * B', // 2
      'A / B', // 3
      'A & B', // 4
      'A | B', // 5
      'A ^ B', // 6
      'A',     // 7
      'B',     // 8
      '~ A',   // 9
      '~ B',   // 10
    ];
  }

  public get config(): Config {
    return new Config(this);
  }

  public get count(): number {
    return this._functions.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._functions = [];

    this._inputA = this.addInput('inputA', 'A', 11.5, 0);
    this._inputB = this.addInput('inputB', 'B', 69, 0);
    this._function = this.addInput('function', 'Función', 70, 33);

    this._result = this.addOutput('result', 'Resultado', 40, 44);
    this._controlN = this.addOutput('controlN', 'N', 77, 11);
    this._controlZ = this.addOutput('controlZ', 'Z', 74, 22);

    this.addFunction(0);
    this.addFunction(4);
    this.addFunction(7);
    this.addFunction(9);
  }

  public run(time: number): boolean {
    switch(this._functions[this._function.value]) {
    case 0:
      this._result.value = this._inputA.value + this._inputB.value;
      break;
    case 1:
      this._result.value = this._inputA.value - this._inputB.value;
      break;
    case 2:
      this._result.value = this._inputA.value * this._inputB.value;
      break;
    case 3:
      this._result.value = this._inputA.value / this._inputB.value;
      break;
    case 4:
      this._result.value = this._inputA.value & this._inputB.value;
      break;
    case 5:
      this._result.value = this._inputA.value | this._inputB.value;
      break;
    case 6:
      this._result.value = this._inputA.value ^ this._inputB.value;
      break;
    case 7:
      this._result.value = this._inputA.value;
      break;
    case 8:
      this._result.value = this._inputB.value;
      break;
    case 9:
      this._result.value = ~ this._inputA.value;
      break;
    case 10:
      this._result.value = ~ this._inputB.value;
      break;
    default:
      break;
    }

    this._controlN.value = (this._result.value < 0) ? 1 : 0;
    this._controlZ.value = (this._result.value === 0) ? 1 : 0;

    return super.run(time);
  }

  public export(): ArithmeticLogicUnitData {
    return {
      functions: [...this._functions],
    };
  }

  public import(data: ArithmeticLogicUnitData): void {
    if (data.functions) {
      this._functions.length = 0;
      data.functions.forEach(func => this.addFunction(func));
    }
  }

  public addFunction(func: number): number {
    this._functions.push(func);
    return this._functions.length - 1;
  }

  public getFunction(index: number): number {
    return this._functions[index];
  }

  public setFunction(index: number, func: number): void {
    if (index >= 0 && index < this._functions.length) {
      this._functions[index] = func;
    }
  }

  public removeFunction(): number {
    if (this._functions.length > 1) {
      this._functions.pop();
    }
    return this._functions.length;
  }
}

class ArithmeticLogicUnitItem extends CpntItem {
  public get type(): string {
    return 'Arithmetic Logic Unit';
  }

  public get image(): string {
    return 'images/cpnt/ArithmeticLogicUnit.svg';
  }

  public get width(): number {
    return 81;
  }

  public get height(): number {
    return 45;
  }

  public get defaultLabel(): string {
    return 'ALU';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(15, 18, 51, 26);
  }

  public cpnt(top: number, left: number): Component {
    return new ArithmeticLogicUnit(this, top, left);
  }
}

customElements.define('cpnt-alu', ArithmeticLogicUnit);
customElements.define('cpnt-item-alu', ArithmeticLogicUnitItem);

export { ArithmeticLogicUnitItem, ArithmeticLogicUnit };
