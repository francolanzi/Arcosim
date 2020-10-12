import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Increment extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._current = this.addInput('Actual', 67, 11);
    this._clock = this.addInput('Clock', 0, 11);

    this._next = this.addOutput('Siguiente', 33.5, 0);

    this._clock.default = 1;
  }

  run() {
    if (this._clock.value) {
      this._next.value = this._current.value + 1;
    }

    return super.run();
  }
}

class IncrementItem extends CpntItem {
  get type() {
    return 'Increment';
  }

  get image() {
    return 'images/cpnt/Increment.svg';
  }

  get width() {
    return 68;
  }

  get height() {
    return 23;
  }

  cpnt(top, left) {
    return new Increment(this, top, left);
  }
}

customElements.define('cpnt-increment', Increment);
customElements.define('cpnt-item-increment', IncrementItem);

export default IncrementItem;
