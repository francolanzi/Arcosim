import Component from '../Component.js';
import Config from '../modal/Clock/Config.js';

class Clock extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Clock.svg',
      width: 61,
      height: 59,
    };
  }

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

customElements.define('cpnt-clock', Clock);

export default Clock;
