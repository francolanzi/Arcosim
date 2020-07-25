const IO = require('./IO');
const Output = require('./Output');

class Input extends IO {
  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._value = null;

    let linked = false;
    let clicked = false;

    this.addEventListener('mousedown', () => clicked = true);
    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', ev => {
      const output = ev.relatedTarget;
      this.blur();

      if (clicked) {
        if (linked) {
          linked = false;
          this.dispatchEvent(new Event('unlink'));
        } else if (output && output.constructor == Output) {
          linked = true;
          this.dispatchEvent(new CustomEvent('link', { detail: output }));
        }
      }
    });
  }

  receive(value) {
    this._value = value;
    this.dispatchEvent(new Event('receive'));
  }

  stop() {
    if (this._value !== null) {
      this._value = null;
      this.dispatchEvent(new Event('stop'));
    }
  }
}

customElements.define('cpnt-input', Input);

module.exports = Input;
