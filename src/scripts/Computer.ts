import Component from './Component.js';
import CpntItem from './CpntItem.js';
import CpntItems from './CpntItems.js';
import CpntInfo from './ifaces/CpntInfo.js';

class Computer extends EventTarget {
  private _stepping: boolean;
  private _running: boolean;
  private _stopped: boolean;
  private _count: number;
  private _time: number;

  private readonly _cpnts: Map<string, Component>;
  private readonly _items: CpntItems;

  public get items(): IterableIterator<CpntItem> {
    return this._items.list();
  }

  public item(type: string): CpntItem | undefined {
    return this._items.get(type);
  }

  public get running(): boolean {
    return this._running;
  }

  public get stepping(): boolean {
    return this._stepping;
  }

  public constructor() {
    super();

    this._items = new CpntItems(this);

    this._cpnts = new Map();
    this._stepping = false;
    this._running = false;
    this._stopped = true;
    this._count = 0;
    this._time = 0;
  }

  public addCpnt(cpnt: Component): void {
    const type = cpnt.type;
    const id = cpnt.cpntId;

    const key = `${type} ${id}`;
    console.log(`${key} added`);
    this._cpnts.set(key, cpnt);

    cpnt.addEventListener('stop', () => this.stop());

    cpnt.addEventListener('remove', () => {
      this.removeCpnt(cpnt.type, cpnt.cpntId);
    });

    this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
  }

  public getCpnt(type: string, id: number): Component | undefined {
    const key = `${type} ${id}`;
    return this._cpnts.get(key);
  }

  public removeCpnt(type: string, id: number): boolean {
    const key = `${type} ${id}`;

    console.log(`${key} removed`);
    return this._cpnts.delete(key);
  }

  public run(): void {
    if (!this.running && !this.stepping) {
      this._running = true;
      this._stopped = false;
      this.dispatchEvent(new Event('run'));
      this.continue();
    }
  }

  public step(): void {
    if (!this.running && !this.stepping) {
      this._stepping = true;
      this.dispatchEvent(new Event('step'));
      this.continue();
    }
  }

  public continue(): void {
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

  public stop(): void {
    if (this.running) {
      this._stopped = true;
    }
  }

  public reset(): void {
    if (!this.running && !this.stepping) {
      this._time = 0;
      this._cpnts.forEach(cpnt => cpnt.reset());
    }
  }

  serialize(): { cpnts: Array<CpntInfo> } {
    const cpnts: Array<CpntInfo> = [];

    this._cpnts.forEach(cpnt =>
      cpnts.push(cpnt.serialize()));

    return { cpnts };
  }

  deserialize(obj: { cpnts: Array<CpntInfo> }): void {
    if (obj.cpnts) {
      this.stop();

      this._cpnts.forEach(cpnt => {
        this.removeCpnt(cpnt.type, cpnt.cpntId);
        cpnt.remove();
      });

      obj.cpnts.forEach(async cpntObj => {
        const item = this.item(cpntObj.type);
        if (item) {
          const cpnt = item.cpnt(cpntObj.top, cpntObj.left);
          cpnt.deserialize(cpntObj);
          this.addCpnt(cpnt);
        }
      });

      this.reset();
    }
  }
}

export default Computer;
