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

    this._value = 0;

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
          if (output && output.constructor == Output) {
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
      this._linked = false;
      this.dispatchEvent(new Event('unlink'));
    }
  }

  receive(value) {
    this._value = value;
    if (this.cpnt.receive) {
      this.cpnt.receive(this.name, this.value);
    }
  }
}

customElements.define('cpnt-input', Input);

module.exports = Input;
