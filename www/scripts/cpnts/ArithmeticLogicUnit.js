import Component from '../Component.js';
import Config from '../modal/ArithmeticLogicUnit/Config.js';

class ArithmeticLogicUnit extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/ArithmeticLogicUnit.svg',
      width: 81,
      height: 45,
    };
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
      this._supported[4] = 'A & B';
      this._supported[5] = 'A | B';
      this._supported[6] = 'A ^ B';
      this._supported[7] = 'A';
      this._supported[8] = 'B';
      this._supported[9] = '~ A';
      this._supported[10] = '~ B';
    }
    return [...this._supported];
  }

  get count() {
    return this._functions.length;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._functions = [];

    this._inputA = this.addInput('A', 11.5, 0);
    this._inputB = this.addInput('B', 69, 0);
    this._function = this.addInput('Función', 70, 33);

    this._result = this.addOutput('Resultado', 40, 44);
    this._controlN = this.addOutput('N', 77, 11);
    this._controlZ = this.addOutput('Z', 74, 22);

    this.addFunction(0);
    this.addFunction(4);
    this.addFunction(7);
    this.addFunction(9);
  }

  run() {
    switch(this._functions[this._function.value]) {
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
      this._result.value = this._inputA.value & this._inputB.value;
      break;
    case 5:
      this._result.value = this._inputA.value | this._inputB.value;
      break;
    case 6:
      this._result.value = this._inputA.value ^ this._inputB.value;
      break;
    case 7:
      this._result.value = this._inputA.value;
      break;
    case 8:
      this._result.value = this._inputB.value;
      break;
    case 9:
      this._result.value = ~ this._inputA.value;
      break;
    case 10:
      this._result.value = ~ this._inputB.value;
      break;
    default:
      break;
    }

    this._controlN.value = (this._result.value < 0) ? 1 : 0;
    this._controlZ.value = (this._result.value === 0) ? 1 : 0;

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.functions = [...this._functions];
    return cpnt;
  }

  deserialize(obj) {
    if (obj.functions) {
      this._functions = [...obj.functions];
    }
  }

  addFunction(func) {
    this._functions.push(func);
    return this._functions.length - 1;
  }

  getFunction(index) {
    return this._functions[index];
  }

  setFunction(index, func) {
    if (index >= 0 && index < this._functions.length) {
      this._functions[index] = func;
    }
  }

  removeFunction() {
    if (this._functions.length > 1) {
      this._functions.pop();
    }
    return this._functions.length;
  }
}

customElements.define('cpnt-alu', ArithmeticLogicUnit);

export default ArithmeticLogicUnit;
