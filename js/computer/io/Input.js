const IO = require('./IO');

class Input extends IO {
  get id() {
    return this._id;
  }

  get value() {
    return this._output ? this._output.value : null;
  }

  get linked() {
    return this._output !== null;
  }

  constructor(name) {
    super(name);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._output = null;

    this._receive = (() => this.dispatchEvent(new Event('receive'))).bind(this);
    this._stop = (() => this.dispatchEvent(new Event('stop'))).bind(this);
  }

  link(output) {
    if (!this.linked) {
      this._output = output;

      output.addEventListener('send', this._receive);
      output.addEventListener('stop', this._stop);

      if (output.value !== null) {
        this._receive();
      }
    }
  }

  unlink() {
    if (this.linked) {
      this._output.removeEventListener('send', this._receive);
      this._output.removeEventListener('stop', this._stop);
      this._output = null;
    }
  }
}

module.exports = Input;
