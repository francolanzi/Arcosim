const { readdirSync } = window.require('fs');
const { resolve } = window.require('path');

class Computer extends EventTarget {
  static async cpntClasses() {
    if (!this._cpntClasses) {
      const dir = resolve(__dirname, 'scripts/cpnts');
      const files = readdirSync(dir);

      this._cpntClasses = new Map();

      for (const file of files) {
        if (file.split('.').pop() === 'js') {
          const Cpnt = (await import(`${dir}/${file}`)).default;
          this._cpntClasses.set(Cpnt.type, Cpnt);
        }
      }
    }
    return Array.from(this._cpntClasses.values());
  }

  static async cpntClass(type) {
    await Computer.cpntClasses();
    return this._cpntClasses.get(type);
  }

  get running() {
    return this._running;
  }

  get stepping() {
    return this._stepping;
  }

  constructor() {
    super();

    this._cpnts = new Map();
    this._stepping = false;
    this._running = false;
    this._stopped = true;
    this._count = 0;
    this._time = 0;
  }

  addCpnt(cpnt) {
    const type = cpnt.constructor.type;
    const id = cpnt.id;

    const key = `${type} ${id}`;
    console.log(`${key} added`);
    this._cpnts.set(key, cpnt);

    cpnt.addEventListener('stop', () => this.stop());

    this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
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
    if (!this.running && !this.stepping) {
      this._running = true;
      this._stopped = false;
      this.dispatchEvent(new Event('run'));
      this.continue();
    }
  }

  step() {
    if (!this.running && !this.stepping) {
      this._stepping = true;
      this.dispatchEvent(new Event('step'));
      this.continue();
    }
  }

  continue() {
    let changed = false;

    this._cpnts.forEach(cpnt =>
      changed = cpnt.run(this._time) || changed);

    const timeout = ++this._count < 1000;

    if (changed && timeout) {
      setTimeout(() => this.continue(), 0);
    } else {
      console.log(`Time = ${this._time++}`);
      this._count = 0;
      if (this.stepping) {
        this._stepping = false;
        this.dispatchEvent(new Event('pause'));
      } else if (this.running) {
        if (!this._stopped && timeout) {
          setTimeout(() => this.continue(), 0);
        } else {
          this._running = false;
          this.dispatchEvent(new Event('stop'));
        }
      }
    }
  }

  stop() {
    if (this.running) {
      this._stopped = true;
    }
  }

  reset() {
    if (!this.running && !this.stepping) {
      this._time = 0;
      this._cpnts.forEach(cpnt => cpnt.reset());
    }
  }

  serialize() {
    const cpnts = [];

    this._cpnts.forEach(cpnt =>
      cpnts.push(cpnt.serialize()));

    return { cpnts };
  }

  deserialize(obj) {
    if (obj.cpnts) {
      this.stop();

      this._cpnts.forEach(cpnt => {
        this.removeCpnt(cpnt.constructor.type, cpnt.id);
        cpnt.remove();
      });

      obj.cpnts.forEach(cpntObj => {
        const Cpnt = this.constructor._cpntClasses.get(cpntObj.type);
        if (Cpnt) {
          const cpnt = new Cpnt(this, cpntObj.top, cpntObj.left);
          cpnt.deserialize(cpntObj);
          this.addCpnt(cpnt);
        }
      });

      this.reset();
    }
  }
}

export default Computer;
