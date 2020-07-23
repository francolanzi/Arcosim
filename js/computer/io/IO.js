class IO {
  constructor(name) {
    if (this.constructor == IO) {
      throw new Error('IO class can not be instantiated');
    }

    this._name = name;
  }
}

module.exports = IO;
