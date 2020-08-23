class Computer extends EventTarget {
  get running() {
    return this._running;
  }

  constructor() {
    super();

    this._cpnts = new Map();
    this._running = false;
    this._time = 0;
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
      this.step();
    }
  }

  step() {
    let changed = false;

    this._cpnts.forEach(cpnt =>
      changed = cpnt.run(this._time) || changed);

    if (changed) {
      setTimeout(() => this.step(), 0);
    } else {
      console.log(`Time = ${this._time++}`);
      if (this.running) {
        setTimeout(() => this.step(), 0);
      }
    }
  }

  stop() {
    if (this.running) {
      this._running = false;
      this.dispatchEvent(new Event('stop'));
    }
  }

  reset() {
    if (!this.running) {
      this._time = 0;
      this._cpnts.forEach(cpnt => cpnt.reset());
    }
  }
}

export default Computer;
