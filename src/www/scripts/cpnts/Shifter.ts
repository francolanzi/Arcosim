import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ShifterData from '../ifaces/data/ShifterData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Shifter/Config.js';

interface Func {
  func: number,
  value: number,
}

class Shifter extends Component {
  private readonly _functions: Array<{ func: number, value: number }>;

  private readonly _input: Input;
  private readonly _function: Input;

  private readonly _result: Output;

  public static get supported(): Array<string> {
    return [
      'Nada', // 0
      '<<',   // 1
      '>>',   // 2
      '>>>',  // 3
    ];
  }

  public get config(): Config {
    return new Config(this);
  }

  public get functions(): IterableIterator<[number, { func: number, value: number }]> {
    return this._functions.entries();
  }

  public get count(): number {
    return this._functions.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._functions = [];

    this._input = this.addInput('input', 'Entrada', 37.5, 0);
    this._function = this.addInput('function', 'Función', 75, 13.5);

    this._result = this.addOutput('result', 'Resultado', 37.5, 27);

    this.addFunction(0, 0);
    this.addFunction(2, 1);
    this.addFunction(1, 1);
  }

  public run(time: number): boolean {
    const { func, value } = this._functions[this._function.value];

    switch(func) {
    case 0:
      this._result.value = this._input.value;
      break;
    case 1:
      this._result.value = this._input.value << value;
      break;
    case 2:
      this._result.value = this._input.value >> value;
      break;
    case 3:
      this._result.value = this._input.value >>> value;
      break;
    default:
      break;
    }

    return super.run(time);
  }

  public export(): ShifterData {
    return {
      functions: [...this._functions],
    };
  }

  public import(data: ShifterData): void {
    if (data.functions) {
      this._functions.length = 0;
      data.functions.forEach(({ func, value }) =>
        this.addFunction(func, value));
    }
  }

  public addFunction(func: number, value: number): number {
    this._functions.push({ func, value });
    return this._functions.length - 1;
  }

  public getFunction(index: number): Func | undefined {
    const func = this._functions[index];
    if (func !== undefined) {
      return { ...func };
    } else {
      return undefined;
    }
  }

  public setFunction(index: number, func: number, value: number): void {
    if (index >= 0 && index < this._functions.length) {
      this._functions[index].func = func;
      this._functions[index].value = value;
    }
  }

  public removeFunction(): number {
    if (this._functions.length > 1) {
      this._functions.pop();
    }
    return this._functions.length;
  }
}

class ShifterItem extends CpntItem {
  public get type(): string {
    return 'Shifter';
  }

  public get image(): string {
    return 'images/cpnt/Shifter.svg';
  }

  public get width(): number {
    return 76;
  }

  public get height(): number {
    return 28;
  }

  public get defaultLabel(): string {
    return 'Shifter';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 74, 26);
  }

  public cpnt(top: number, left: number): Component {
    return new Shifter(this, top, left);
  }
}

customElements.define('cpnt-shifter', Shifter);
customElements.define('cpnt-item-shifter', ShifterItem);

export { ShifterItem, Shifter };
