import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Decrement extends Component {
  private readonly _current: Input;
  private readonly _clock: Input;

  private readonly _previous: Output;

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._current = this.addInput('current', 'Actual', 67, 11);
    this._clock = this.addInput('clock', 'Clock', 0, 11);

    this._previous = this.addOutput('previous', 'Anterior', 33.5, 0);

    this._clock.default = 1;
  }

  public run (time: number): boolean {
    if (this._clock.value) {
      this._previous.value = this._current.value - 1;
    }

    return super.run(time);
  }
}

class DecrementItem extends CpntItem {
  public get type (): string {
    return 'Decrement';
  }

  public get image (): string {
    return 'images/cpnt/Decrement.svg';
  }

  public get width (): number {
    return 68;
  }

  public get height (): number {
    return 23;
  }

  public get defaultLabel (): string {
    return 'Decrement';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 66, 21);
  }

  public cpnt (top: number, left: number): Component {
    return new Decrement(this, top, left);
  }
}

customElements.define('cpnt-decrement', Decrement);
customElements.define('cpnt-item-decrement', DecrementItem);

export { Decrement, DecrementItem };
