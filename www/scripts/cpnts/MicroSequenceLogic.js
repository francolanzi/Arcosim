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

  get count() {
    return this._conditions.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._conditions = [];

    this._condition = this.addInput('Condición', 61, 20.5);
    this._controlN = this.addInput('N', 0, 15);
    this._controlZ = this.addInput('Z', 0, 26);

    this._jump = this.addOutput('Saltar', 30.5, 0);

    this.addCondition(0);
    this.addCondition(2);
    this.addCondition(3);
    this.addCondition(7);
  }

  run() {
    switch (this._conditions[this._condition.value]) {
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

  serialize() {
    const cpnt = super.serialize();
    cpnt.conditions = [...this._conditions];
    return cpnt;
  }

  deserialize(obj) {
    if (obj.conditions) {
      this._conditions = [...obj.conditions];
    }
  }

  addCondition(cond) {
    this._conditions.push(cond);
    return this._conditions.length - 1;
  }

  getCondition(index) {
    return this._conditions[index];
  }

  setCondition(index, cond) {
    if (index >= 0 && index < this._conditions.length) {
      this._conditions[index] = cond;
    }
  }

  removeCondition() {
    this._conditions.pop();
    return this._conditions.length;
  }
}

customElements.define('cpnt-msl', MicroSequenceLogic);

export default MicroSequenceLogic;
