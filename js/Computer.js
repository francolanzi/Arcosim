class Computer extends EventTarget {
  get running() {
    return this._running;
  }

  constructor() {
    super();

    this._cpnts = new Map();
    this._running = false;
  }

  addCpnt(cpnt) {
    const type = cpnt.constructor.type;
    const id = cpnt.id;

    const key = `${type} ${id}`;
    console.log(`${key} added`);
    this._cpnts.set(key, cpnt);

    cpnt.addEventListener('stop', () => this.stop());

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
    if (!this.running) {
      this._running = true;
      this.dispatchEvent(new Event('run'));
      this.step(0);
    }
  }

  step(time) {
    console.log(`Time = ${time}`);

    let changed = false;

    do {
      changed = false;
      this._cpnts.forEach(cpnt =>
        changed = cpnt.run(time) || changed);
    } while (this.running && changed);

    if (this.running) {
      setTimeout(() => this.step(time + 1), 0);
    }
  }

  stop() {
    if (this.running) {
      this._running = false;
      this.dispatchEvent(new Event('stop'));
    }
  }

  reset() {
    this._cpnts.forEach(cpnt => cpnt.reset());
  }
}

module.exports = Computer;
