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

  run() {
    let time = 0;
    let running = true;
    let changed = false;

    const stop = () => {
      running = false;
      this._cpnts.forEach(cpnt =>
        cpnt.removeEventListener('stop', stop));
    };

    this._cpnts.forEach(cpnt =>
      cpnt.addEventListener('stop', stop));

    do {
      console.log(`Time = ${time}`);
      do {
        changed = false;
        this._cpnts.forEach(cpnt =>
          changed = cpnt.run(time) || changed);
      } while (running && changed);
      time++;
    } while(running);
  }

  reset() {
    this._cpnts.forEach(cpnt => cpnt.reset());
  }
}

module.exports = Computer;
