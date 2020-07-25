const IO = require('./IO');

class Output extends IO {
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

    let clicked = false;
    let focused = false;

    this.addEventListener('mousedown', () => {
      if (focused) {
        this.blur();
      } else {
        clicked = true;
      }
    });

    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', () => {
      if (clicked) {
        focused = true;
      } else {
        this.blur();
      }
    });

    this.addEventListener('blur', () => focused = false);
  }

  send(value) {
    this._value = value;
    this.dispatchEvent(new Event('send'));
  }

  stop() {
    if (this._value !== null) {
      this._value = null;
      this.dispatchEvent(new Event('stop'));
    }
  }
}

customElements.define('cpnt-output', Output);

module.exports = Output;
