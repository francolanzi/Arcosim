class Computer {
  constructor() {
    this._cpnts = new Map();
  }

  addCpnt(cpnt) {
    const type = cpnt.constructor.type;
    const id = cpnt.id;

    const key = `${type} ${id}`;
    console.log(`${key} added`);
    this._cpnts.set(key, cpnt);
    return cpnt;
  }

  getCpnt(type, id) {
    const key = `${type} ${id}`;
    return this._cpnts.get(key);
  }

  removeCpnt(type, id) {
    const key = `${type} ${id}`;

    console.log(`${key} removed`);
    return this._cpnts.delete(key);
  }
}

module.exports = Computer;
