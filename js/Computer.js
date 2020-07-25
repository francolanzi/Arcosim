class Computer {
  constructor() {
    this._cpnts = new Map();
  }

  addCpnt(cpnt) {
    const key = cpnt.constructor.type + cpnt.id;
    this._cpnts.set(key, cpnt);

    console.log(`${key} added`);
    return cpnt;
  }

  getCpnt(type, id) {
    return this._cpnts.get(type + id);
  }

  removeCpnt(type, id) {
    console.log(`${type} ${id} removed`);
    return this._cpnts.delete(type + id);
  }
}

module.exports = Computer;
