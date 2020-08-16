const Component = require('../Component');
const Config = require('../config/MicroSequenceLogic');

class MicroSequenceLogic extends Component {
  static get imageFile() {
    return 'images/cpnt/MicroSequenceLogic.svg';
  }

  static get imageWidth() {
    return 62;
  }

  static get imageHeight() {
    return 42;
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
      this._supported[4] = '>= 0';
      this._supported[5] = '<= 0';
      this._supported[6] = 'Siempre';
    }
    return [...this._supported];
  }

  get conditions() {
    return this._conditions.entries();
  }

  get conditionCount() {
    return this._conditions.size;
  }

  constructor(top, left) {
    super(top, left);

    this._conditions = new Map();

    this._condition = this.addInput('Condition', 61, 20.5);
    this._control = this.addInput('Control', 0, 20.5);

    this._jump = this.addOutput('Jump', 30.5, 0);

    this.setCondition(0, 0);
    this.setCondition(1, 2);
    this.setCondition(2, 3);
    this.setCondition(3, 6);
  }

  run() {
    switch (this._conditions.get(this._condition.value)) {
    case 0:
      this._jump.value = 0;
      break;
    case 1:
      this._jump.value = this._control.value === 0b00 ? 1 : 0;
      break;
    case 2:
      this._jump.value = this._control.value === 0b10 ? 1 : 0;
      break;
    case 3:
      this._jump.value = this._control.value === 0b01 ? 1 : 0;
      break;
    case 4:
      this._jump.value = this._control.value !== 0b10 ? 1 : 0;
      break;
    case 5:
      this._jump.value = this._control.value !== 0b00 ? 1 : 0;
      break;
    case 6:
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

module.exports = MicroSequenceLogic;
