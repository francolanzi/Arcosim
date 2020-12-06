import Component from './Component.js';
import CpntItem from './CpntItem.js';
import CpntItems from './CpntItems.js';
import ComputerInfo from './ifaces/ComputerInfo.js';
import CpntInfo from './ifaces/CpntInfo.js';
import LinkInfo from './ifaces/LinkInfo.js';

const { readFileSync, writeFileSync } = window.require('fs');

class Computer extends EventTarget {
  private _stepping: boolean;
  private _running: boolean;
  private _stopped: boolean;
  private _count: number;
  private _time: number;

  private readonly _cpnts: Map<number, Component>;
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
    console.log(`${cpnt.type} ${cpnt.cpntId} added`);

    this._cpnts.set(cpnt.cpntId, cpnt);

    cpnt.addEventListener('stop', () => this.stop());

    cpnt.addEventListener('remove', () => {
      this.removeCpnt(cpnt.cpntId);
    });

    this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
  }

  public getCpnt(id: number): Component | undefined {
    return this._cpnts.get(id);
  }

  public removeCpnt(id: number): boolean {
    const cpnt = this._cpnts.get(id);

    if (cpnt) {
      console.log(`${cpnt.type} ${cpnt.cpntId} removed`);
    }

    return this._cpnts.delete(id);
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

  serialize(): ComputerInfo {
    const cpnts: Array<CpntInfo> = [];
    const links: Array<LinkInfo> = [];

    this._cpnts.forEach(cpnt => {
      cpnts.push(cpnt.serialize());

      for (const input of cpnt.inputs) {
        if (input.link) {
          links.push(input.link.serialize());
        }
      }
    });

    return { cpnts, links };
  }

  deserialize(obj: ComputerInfo): void {
    if (obj.cpnts && obj.links) {
      this.stop();

      this._cpnts.forEach(cpnt => {
        this.removeCpnt(cpnt.cpntId);
        cpnt.remove();
      });

      const cpntIds = new Map<number, number>();

      obj.cpnts.forEach(cpntInfo => {
        const item = this.item(cpntInfo.type);
        if (item) {
          const cpnt = item.cpnt(cpntInfo.top, cpntInfo.left);
          cpnt.deserialize(cpntInfo);
          this.addCpnt(cpnt);
          cpntIds.set(cpntInfo.cpntId, cpnt.cpntId);
        }
      });

      obj.links.forEach(linkInfo => {
        const inputCpntId = cpntIds.get(linkInfo.input.cpntId);
        const outputCpntId = cpntIds.get(linkInfo.output.cpntId);

        if (inputCpntId && outputCpntId) {
          const inputCpnt = this.getCpnt(inputCpntId);
          const outputCpnt = this.getCpnt(outputCpntId);

          if (inputCpnt && outputCpnt) {
            const input = inputCpnt.getInput(linkInfo.input.ioId);
            const output = outputCpnt.getOutput(linkInfo.output.ioId);

            if (input && output) {
              input.createLink(output);
              input.link?.deserialize(linkInfo);
            }

          }
        }
      });

      this.reset();
    }
  }

  serializeFile(path: string): void {
    try {
      const content = JSON.stringify(this.serialize());
      writeFileSync(path, content);
    } catch {
      console.log(`Write failed: ${path}`);
    }
  }

  deserializeFile(path: string): void {
    try {
      const content = readFileSync(path, { encoding: 'utf8' });
      this.deserialize(JSON.parse(content));
    } catch {
      console.log(`Read failed: ${path}`);
    }
  }
}

export default Computer;
