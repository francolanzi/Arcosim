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

    this._inputA = this.addInput('A', 11.5, 0);
    this._inputB = this.addInput('B', 69, 0);
    this._function = this.addInput('Function', 70, 29.5);

    this._result = this.addOutput('Result', 39.5, 44);
    this._control = this.addOutput('Control', 75, 14.5);

    this.setFunction(0, 0);
    this.setFunction(1, 5);
    this.setFunction(2, 8);
    this.setFunction(3, 10);
  }

  run() {
    switch(this._functions.get(this._function.value)) {
    case 0:
      this._result.value = this._inputA.value + this._inputB.value;
      break;
    case 1:
      this._result.value = this._inputA.value - this._inputB.value;
      break;
    case 2:
      this._result.value = this._inputA.value * this._inputB.value;
      break;
    case 3:
      this._result.value = this._inputA.value / this._inputB.value;
      break;
    case 4:
      this._result.value = this._inputB.value / this._inputA.value;
      break;
    case 5:
      this._result.value = this._inputA.value & this._inputB.value;
      break;
    case 6:
      this._result.value = this._inputA.value | this._inputB.value;
      break;
    case 7:
      this._result.value = this._inputA.value ^ this._inputB.value;
      break;
    case 8:
      this._result.value = this._inputA.value;
      break;
    case 9:
      this._result.value = this._inputB.value;
      break;
    case 10:
      this._result.value = ~ this._inputA.value;
      break;
    case 11:
      this._result.value = ~ this._inputB.value;
      break;
    default:
      break;
    }

    if (this._result.value > 0) {
      this._control.value = 0b00;
    } else if (this._result.value === 0) {
      this._control.value = 0b01;
    } else {
      this._control.value = 0b10;
    }

    return super.run();
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
