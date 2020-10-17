import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ClockInfo from '../ifaces/cpntInfo/ClockInfo.js';
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

  public serialize(): ClockInfo {
    const cpnt = <ClockInfo> super.serialize();
    cpnt.subcycles = this.subcycles;
    return cpnt;
  }

  public deserialize(obj: ClockInfo): void {
    if (obj.subcycles) {
      let subcycle = this._subcycles.pop();
      while (subcycle) {
        this.removeOutput(subcycle.outputId);
        subcycle = this._subcycles.pop();
      }

      for (let i = 0; i < obj.subcycles; i++) {
        this.addSubcycle();
      }

      this.makeSubcycles();
    }
  }

  public addSubcycle(): void {
    const name = `Subciclo ${this.subcycles + 1}`;
    const subcycle = this.addOutput(name, 0, 0);
    this._subcycles.push(subcycle);
    subcycle.color = 'gray';
    subcycle.dashed = true;
    this.makeSubcycles();
  }

  public removeSubcycle(): void {
    const subcycle = this._subcycles.pop();
    if (subcycle) {
      this.removeOutput(subcycle.outputId);
      this.makeSubcycles();
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

  public cpnt(top: number, left: number): Component {
    return new Clock(this, top, left);
  }
}

customElements.define('cpnt-clock', Clock);
customElements.define('cpnt-item-clock', ClockItem);

export { ClockItem, Clock };
