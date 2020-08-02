const Component = require('../Component');
const Config = require('../config/ArithmeticLogicUnit');

class ArithmeticLogicUnit extends Component {
  static get imageFile() {
    return 'img/cpnt/ArithmeticLogicUnit.png';
  }

  get config() {
    return new Config(this);
  }

  static get supported() {
    if (!this._supported) {
      this._supported = [];
      this._supported[0] = 'A + B';
      this._supported[1] = 'A - B';
      this._supported[2] = 'A * B';
      this._supported[3] = 'A / B';
      this._supported[4] = 'B / A';
      this._supported[5] = 'A & B';
      this._supported[6] = 'A | B';
      this._supported[7] = 'A ^ B';
      this._supported[8] = 'A';
      this._supported[9] = 'B';
      this._supported[10] = '~ A';
      this._supported[11] = '~ B';
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

    this.addInput('InputA', 11.5, 0);
    this.addInput('InputB', 69, 0);
    this.addInput('Function', 70, 29.5);

    this.addOutput('Result', 39.5, 44);
    this.addOutput('Control', 75, 14.5);

    this.setFunction(0, 0);
    this.setFunction(1, 5);
    this.setFunction(2, 8);
    this.setFunction(3, 10);
  }

  getFunction(index) {
    return this._functions.get(index);
  }

  setFunction(index, func) {
    this._functions.set(index, func);
  }

  removeFunction(index) {
    this._functions.delete(index);
  }
}

customElements.define('cpnt-alu', ArithmeticLogicUnit);

module.exports = ArithmeticLogicUnit;
