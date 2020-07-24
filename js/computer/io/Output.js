const IO = require('./IO');

class Output extends IO {
  get value() {
    return this._value;
  }

  constructor(name) {
    super(name);
    this._value = null;
  }

  send(value) {
    if (!this._sending) {
      this._value = value;
      this.dispatchEvent(new Event('send'));
    }
  }

  stop() {
    if (this._sending) {
      this._value = null;
      this.dispatchEvent(new Event('stop'));
    }
  }
}

module.exports = Output;
