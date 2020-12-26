import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ClockData from '../ifaces/data/ClockData.js';
import Output from '../io/Output.js';
import Config from '../modal/Clock/Config.js';

class Clock extends Component {
  private readonly _subcycles: Array<Output>;

  public get config(): Config {
    return new Config(this);
  }

  public get subcycles(): number {
    return this._subcycles.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._subcycles = [];

    this.addSubcycle();
  }

  public run(time: number): boolean {
    const current = time % this._subcycles.length;

    this._subcycles.forEach((subcycle, index) =>
      subcycle.value = index === current ? 1 : 0);

    return super.run(time);
  }

  public export(): ClockData {
    return {
      subcycles: this.subcycles,
    };
  }

  public import(data: ClockData): void {
    if (data.subcycles) {
      let subcycle = this._subcycles.pop();
      while (subcycle) {
        this.removeOutput(subcycle.ioId);
        subcycle = this._subcycles.pop();
      }

      for (let i = 0; i < data.subcycles; i++) {
        this.addSubcycle();
      }

      this.makeSubcycles();
    }
  }

  public addSubcycle(): void {
    const id = `subcycle${this.subcycles + 1}`;
    const name = `Subciclo ${this.subcycles + 1}`;
    const subcycle = this.addOutput(id, name, 0, 0);
    this._subcycles.push(subcycle);
    subcycle.opacity = 0.5;
    subcycle.dashed = true;
    this.makeSubcycles();
  }

  public removeSubcycle(): void {
    if (this.subcycles > 1) {
      const subcycle = this._subcycles.pop();
      if (subcycle) {
        this.removeOutput(subcycle.ioId);
        this.makeSubcycles();
      }
    }
  }

  public makeSubcycles(): void {
    if (this.subcycles === 1) {
      this._subcycles[0].y = 58 / 2;
    } else {
      const space = 58 / (this.subcycles - 1);

      let y = 58;
      this._subcycles.forEach(subcycle => {
        subcycle.y = y;
        y -= space;
      });
    }
  }
}

class ClockItem extends CpntItem {
  public get type(): string {
    return 'Clock';
  }

  public get image(): string {
    return 'images/cpnt/Clock.svg';
  }

  public get width(): number {
    return 61;
  }

  public get height(): number {
    return 59;
  }

  public get defaultLabel(): string {
    return 'Clock';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 59, 57);
  }

  public cpnt(top: number, left: number): Component {
    return new Clock(this, top, left);
  }
}

customElements.define('cpnt-clock', Clock);
customElements.define('cpnt-item-clock', ClockItem);

export { ClockItem, Clock };
