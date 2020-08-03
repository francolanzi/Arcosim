const Component = require('../Component');
const Config = require('../config/MicroSequenceLogic');

class MicroSequenceLogic extends Component {
  static get imageFile() {
    return 'img/cpnt/MicroSequenceLogic.png';
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

    this.addInput('Condition', 61, 20.5);
    this.addInput('Control', 0, 20.5);

    this.addOutput('Jump', 30.5, 0);

    this.setCondition(0, 0);
    this.setCondition(1, 2);
    this.setCondition(2, 3);
    this.setCondition(3, 6);
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
