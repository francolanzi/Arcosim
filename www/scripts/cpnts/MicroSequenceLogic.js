import Component from '../Component.js';
import Config from '../modal/MicroSequenceLogic/Config.js';

class MicroSequenceLogic extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/MicroSequenceLogic.svg',
      width: 62,
      height: 42,
    };
  }

  get config() {
    return new Config(this);
  }

  static get supported() {
    if (!this._supported) {
      this._supported = [];
      this._supported[0] = 'Nunca';
      this._supported[1] = '> 0';
      this._supported[2] = '< 0';
      this._supported[3] = '= 0';
      this._supported[4] = '!= 0';
      this._supported[5] = '>= 0';
      this._supported[6] = '<= 0';
      this._supported[7] = 'Siempre';
    }
    return [...this._supported];
  }

  get conditions() {
    return this._conditions.entries();
  }

  get conditionCount() {
    return this._conditions.size;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._conditions = new Map();

    this._condition = this.addInput('Condición', 61, 20.5);
    this._controlN = this.addInput('N', 0, 15);
    this._controlZ = this.addInput('Z', 0, 26);

    this._jump = this.addOutput('Saltar', 30.5, 0);

    this.setCondition(0, 0);
    this.setCondition(1, 2);
    this.setCondition(2, 3);
    this.setCondition(3, 7);
  }

  run() {
    switch (this._conditions.get(this._condition.value)) {
    case 0:
      this._jump.value = 0;
      break;
    case 1:
      this._jump.value = 1 - this._controlN.value - this._controlZ.value;
      break;
    case 2:
      this._jump.value = this._controlN.value;
      break;
    case 3:
      this._jump.value = this._controlZ.value;
      break;
    case 4:
      this._jump.value = 1 - this._controlZ.value;
      break;
    case 5:
      this._jump.value = 1 - this._controlN.value;
      break;
    case 6:
      this._jump.value = this._controlN.value + this._controlZ.value;
      break;
    case 7:
      this._jump.value = 1;
      break;
    default:
      break;
    }
    return super.run();
  }

  getCondition(index) {
    return this._conditions.get(index);
  }

  setCondition(index, cond) {
    this._conditions.set(index, cond);
  }

  removeCondition(index) {
    this._conditions.delete(index);
  }
}

customElements.define('cpnt-msl', MicroSequenceLogic);

export default MicroSequenceLogic;
