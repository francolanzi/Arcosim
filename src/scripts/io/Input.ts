import Component from '../Component.js';
import IO from './IO.js';
import Output from './Output.js';

class Input extends IO {
  private static _count = 0;

  private _linked: boolean;
  private _clicked: boolean;

  public readonly inputId: number;

  public get default(): number {
    return super.default;
  }

  public set default(value: number) {
    super.default = value;
    if (!this.linked) {
      this.value = value;
    }
  }

  public get linked(): boolean {
    return this._linked;
  }

  public constructor(cpnt: Component, name: string, x: number, y: number) {
    super(cpnt, name, x, y);

    this.inputId = Input._count++;

    this._linked = false;
    this._clicked = false;

    this.addEventListener('mousedown', () => this._clicked = true);
    this.addEventListener('mouseup', () => this._clicked = false);

    this.addEventListener('focus', ev => {
      this.blur();

      if (this._clicked) {
        if (this.linked) {
          this.unlink();
        } else {
          const output = ev.relatedTarget;
          if (output && output.constructor === Output) {
            this.link(output);
          }
        }
      }
    });
  }

  public link(output: Output): void {
    if (!this.linked) {
      this._linked = true;

      const ev = new CustomEvent('link', { detail: output });
      this.dispatchEvent(ev);
    }
  }

  public unlink(): void {
    if (this.linked) {
      this._linked = false;
      this.reset();

      const ev = new Event('unlink');
      this.dispatchEvent(ev);
    }
  }

  public reset(): void {
    if (!this.linked) {
      super.reset();
    }
  }
}

customElements.define('cpnt-input', Input);

export default Input;
