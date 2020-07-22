const fs = require('fs');
const path = require('path');

class Computer {
  static init() {
    if (!this._cpntClasses) {
      this._cpntClasses = new Map();

      fs.readdirSync(path.resolve(__dirname, 'cpnts')).forEach(file => {
        file = path.parse(file);
        if (file.ext === '.js') {
          const cpnt = require('./cpnts/' + file.name);
          this._cpntClasses.set(cpnt.type, cpnt);
        }
      });
    }
  }

  static cpntTypes() {
    Computer.init();
    return this._cpntClasses.keys();
  }

  constructor() {
    this.constructor.init();
    this._cpnts = new Map();
  }

  addCpnt(type) {
    const Component = this.constructor._cpntClasses.get(type);
    const cpnt = new Component();
    const key = cpnt.constructor.type + cpnt.id;
    this._cpnts.set(key, cpnt);

    console.log(type + ' ' + cpnt.id + ' added');
    return cpnt;
  }

  getCpnt(type, id) {
    return this._cpnts.get(type + id);
  }

  removeCpnt(type, id) {
    console.log(type + ' ' + id + ' removed');
    return this._cpnts.delete(type + id);
  }
}

module.exports = Computer;
