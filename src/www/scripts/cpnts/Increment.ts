import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Increment extends Component {
  private readonly _current: Input;
  private readonly _clock: Input;

  private readonly _next: Output;

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._current = this.addInput('current', 'Actual', 67, 11);
    this._clock = this.addInput('clock', 'Clock', 0, 11);

    this._next = this.addOutput('next', 'Siguiente', 33.5, 0);

    this._clock.default = 1;
  }

  public run(time: number): boolean {
    if (this._clock.value) {
      this._next.value = this._current.value + 1;
    }

    return super.run(time);
  }
}

class IncrementItem extends CpntItem {
  public get type(): string {
    return 'Increment';
  }

  public get image(): string {
    return 'images/cpnt/Increment.svg';
  }

  public get width(): number {
    return 68;
  }

  public get height(): number {
    return 23;
  }

  public get defaultLabel(): string {
    return 'Increment';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 66, 21);
  }

  public cpnt(top: number, left: number): Component {
    return new Increment(this, top, left);
  }
}

customElements.define('cpnt-increment', Increment);
customElements.define('cpnt-item-increment', IncrementItem);

export { IncrementItem, Increment };
