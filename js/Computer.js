class Computer {
  constructor() {
    this._cpnts = new Map();
  }

  addCpnt(cpnt) {
    const type = cpnt.constructor.type;
    const id = cpnt.id;

    this._cpnts.set(type + id, cpnt);
    console.log(`${type} ${id} added`);
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
