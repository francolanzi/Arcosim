const Component = require('../Component');
const Config = require('../config/Shifter');

class Shifter extends Component {
  static get imageFile() {
    return 'img/cpnt/Shifter.png';
  }

  get config() {
    return new Config(this);
  }

  static get supported() {
    if (!this._supported) {
      this._supported = [];
      this._supported[0] = 'Nada';
      this._supported[1] = '<<';
      this._supported[2] = '>>';
      this._supported[3] = '>>>';
    }
    return [...this._supported];
  }

  get functions() {
    return this._functions.entries();
  }

  get functionCount() {
    return this._functions.size;
  }

  constructor(top, left) {
    super(top, left);

    this._functions = new Map();

    this.addInput('Input', 37.5, 0);
    this.addInput('Function', 75, 13.5);

    this.addOutput('Result', 37.5, 27);

    this.setFunction(0, 0, 0);
    this.setFunction(1, 2, 1);
    this.setFunction(2, 1, 1);
  }

  getFunction(index) {
    return { ...this._functions.get(index) };
  }

  setFunction(index, func, value) {
    this._functions.set(index, { func, value });
  }

  removeFunction(index) {
    this._functions.delete(index);
  }
}

customElements.define('cpnt-shifter', Shifter);

module.exports = Shifter;
