import IO from './IO.js';
import Output from './Output.js';

class Input extends IO {
  get id() {
    return this._id;
  }

  get default() {
    return super.default;
  }

  set default(_default) {
    super.default = _default;
    if (!this.linked) {
      this.value = _default;
    }
  }

  get linked() {
    return this._linked;
  }

  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._linked = false;
    this._clicked = false;

    this.addEventListener('mousedown', () => this._clicked = true);
    this.addEventListener('mouseup', () => this._clicked = false);

    this.addEventListener('focus', ev => {
      this.blur();

      if (this._clicked) {
        if (this._linked) {
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

  link(output) {
    if (!this._linked) {
      this._linked = true;
      this.dispatchEvent(new CustomEvent('link', { detail: output }));
    }
  }

  unlink() {
    if (this._linked) {
      this.reset();
      this._linked = false;
      this.dispatchEvent(new Event('unlink'));
    }
  }

  reset() {
    if (!this.linked) {
      super.reset();
    }
  }
}

customElements.define('cpnt-input', Input);

export default Input;
