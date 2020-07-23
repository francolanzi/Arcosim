const Input = require('./Input');
const Output = require('./Output');

class Component {
  static get type() {
    return this.name;
  }

  constructor() {
    if (this.constructor == Component) {
      throw new Error('Component class can not be instantiated');
    }

    if (!this.constructor._count) {
      this.constructor._count = new Map();
    }

    const count = this.constructor._count.get(this.constructor.name);
    this._id = count ? count + 1 : 1;
    this.constructor._count.set(this.constructor.name, this._id);

    this._inputs = new Map();
    this._outputs = new Map();
  }

  get id() {
    return this._id;
  }

  get inputs() {
    return this._inputs.keys();
  }

  get outputs() {
    return this._outputs.keys();
  }

  addInput(name) {
    if (!this._inputs.has(name)) {
      this._inputs.set(name, new Input(name));
    }
    return this.getInput(name);
  }

  addOutput(name) {
    if (!this._outputs.has(name)) {
      this._outputs.set(name, new Output(name));
    }
    return this.getOutput(name);
  }

  getInput(name) {
    return this._inputs.get(name);
  }

  getOutput(name) {
    return this._outputs.get(name);
  }

  removeInput(name) {
    return this._inputs.delete(name);
  }

  removeOutput(name) {
    return this._outputs.delete(name);
  }
}

module.exports = Component;
