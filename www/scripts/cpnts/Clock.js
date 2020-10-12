import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Config from '../modal/Clock/Config.js';

class Clock extends Component {
  get config() {
    return new Config(this);
  }

  get subcycles() {
    return this._subcycles.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._subcycles = [];

    this.addSubcycle();
  }

  run(time) {
    const current = time % this._subcycles.length;

    this._subcycles.forEach((subcycle, index) =>
      subcycle.value = index === current ? 1 : 0);

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.subcycles = this.subcycles;
    return cpnt;
  }

  deserialize(obj) {
    if (obj.subcycles) {
      while (this._subcycles.length) {
        const subcycle = this._subcycles.pop();
        this.removeOutput(subcycle.id);
      }

      for (let i = 0; i < obj.subcycles; i++) {
        this.addSubcycle();
      }

      this.makeSubcycles();
    }
  }

  addSubcycle() {
    const name = `Subciclo ${this.subcycles + 1}`;
    const subcycle = this.addOutput(name, 0, 0);
    this._subcycles.push(subcycle);
    subcycle.color = 'gray';
    subcycle.dashed = true;
    this.makeSubcycles();
  }

  removeSubcycle() {
    if (this.subcycles > 1) {
      const subcycle = this._subcycles.pop();
      this.removeOutput(subcycle.id);
      this.makeSubcycles();
    }
  }

  makeSubcycles() {
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
  get type() {
    return 'Clock';
  }

  get image() {
    return 'images/cpnt/Clock.svg';
  }

  get width() {
    return 61;
  }

  get height() {
    return 59;
  }

  cpnt(top, left) {
    return new Clock(this, top, left);
  }
}

customElements.define('cpnt-clock', Clock);
customElements.define('cpnt-item-clock', ClockItem);

export default ClockItem;
