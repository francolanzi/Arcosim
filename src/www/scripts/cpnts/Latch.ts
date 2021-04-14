import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Latch/Config.js';

class Latch extends Component {
  private _value: number;

  private readonly _input: Input;
  private readonly _clock: Input;

  private readonly _output: Output;

  public get config(): Config {
    return new Config(this);
  }

  public get value(): number {
    return this._value;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._value = 0;

    this._input = this.addInput('input', 'Entrada', 31.5, 0);
    this._clock = this.addInput('clock', 'Clock', 63, 9.5);

    this._output = this.addOutput('output', 'Salida', 31.5, 19);

    this._clock.default = 1;
  }

  public run(time: number): boolean {
    if (this._clock.value) {
      this._value = this._input.value;
    } else {
      this._output.value = this._value;
    }

    return super.run(time);
  }

  public reset(): void {
    super.reset();
    this._value = 0;
  }
}

class LatchItem extends CpntItem {
  public get type(): string {
    return 'Latch';
  }

  public get image(): string {
    return 'images/cpnt/Latch.svg';
  }

  public get width(): number {
    return 64;
  }

  public get height(): number {
    return 20;
  }

  public get defaultLabel(): string {
    return 'Latch';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 62, 18);
  }

  public cpnt(top: number, left: number): Component {
    return new Latch(this, top, left);
  }
}

customElements.define('cpnt-latch', Latch);
customElements.define('cpnt-item-latch', LatchItem);

export { LatchItem, Latch };
