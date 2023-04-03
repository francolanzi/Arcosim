import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import IncrementData from '../ifaces/data/IncrementData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Increment/Config.js';

class Increment extends Component {
  private _value: string;

  private readonly _current: Input;
  private readonly _clock: Input;

  private readonly _next: Output;

  public get config (): Config {
    return new Config(this);
  }

  public get value (): string {
    return this._value;
  }

  public set value (value: string) {
    if (value && !isNaN(Number(value))) {
      this._value = value;
    }
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._current = this.addInput('current', 'Actual', 67, 11);
    this._clock = this.addInput('clock', 'Clock', 0, 11);

    this._next = this.addOutput('next', 'Siguiente', 33.5, 0);

    this._clock.default = 1;

    this._value = (1).toString();
  }

  public run (time: number): boolean {
    if (this._clock.value) {
      this._next.value = this._current.value + Number(this._value);
    }

    return super.run(time);
  }

  public export (): IncrementData {
    return {
      value: this.value
    };
  }

  public import (data: IncrementData): void {
    if (data.value) {
      this.value = data.value;
    }
  }
}

class IncrementItem extends CpntItem {
  public get type (): string {
    return 'Increment';
  }

  public get image (): string {
    return 'images/cpnt/Increment.svg';
  }

  public get width (): number {
    return 68;
  }

  public get height (): number {
    return 23;
  }

  public get defaultLabel (): string {
    return 'Increment';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 66, 21);
  }

  public cpnt (top: number, left: number): Component {
    return new Increment(this, top, left);
  }
}

customElements.define('cpnt-increment', Increment);
customElements.define('cpnt-item-increment', IncrementItem);

export { Increment, IncrementItem };
