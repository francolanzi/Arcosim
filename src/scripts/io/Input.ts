import Component from '../Component.js';
import Link from '../link/Link.js';
import IO from './IO.js';
import Output from './Output.js';

class Input extends IO {
  private _link: Link | undefined;
  private _clicked: boolean;

  public get default(): number {
    return super.default;
  }

  public set default(value: number) {
    super.default = value;
    if (!this.link) {
      this.value = value;
    }
  }

  public get link(): Link | undefined {
    return this._link;
  }

  public constructor(cpnt: Component, id: string, name: string, x: number, y: number) {
    super(cpnt, id, name, x, y);

    this._link = undefined;
    this._clicked = false;

    this.addEventListener('mousedown', () => this._clicked = true);
    this.addEventListener('mouseup', () => this._clicked = false);

    this.addEventListener('focus', ev => {
      this.blur();

      if (this._clicked) {
        if (this.link) {
          this.removeLink();
        } else {
          const output = ev.relatedTarget;
          if (output && output.constructor === Output) {
            this.createLink(output);
          }
        }
      }
    });
  }

  public createLink(output: Output): void {
    if (!this.link) {
      this._link = new Link(this, output);

      const ev = new CustomEvent('link', {
        detail: this._link,
        bubbles: true,
      });
      this.dispatchEvent(ev);
    }
  }

  public removeLink(): void {
    const link = this.link;
    if (link) {
      this._link = undefined;
      link.remove();
      this.reset();

      const ev = new Event('unlink');
      this.dispatchEvent(ev);
    }
  }

  public reset(): void {
    if (!this.link) {
      super.reset();
    }
  }

  public remove(): void {
    if (this.link) {
      this.link.remove();
    }
    super.remove();
  }
}

customElements.define('cpnt-input', Input);

export default Input;
