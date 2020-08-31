import Component from '../Component.js';
import Config from '../modal/Shifter/Config.js';

class Shifter extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Shifter.svg',
      width: 76,
      height: 28,
    };
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

  constructor(computer, top, left) {
    super(computer, top, left);

    this._functions = new Map();

    this._input = this.addInput('Entrada', 37.5, 0);
    this._function = this.addInput('Función', 75, 13.5);

    this._result = this.addOutput('Resultado', 37.5, 27);

    this.setFunction(0, 0, 0);
    this.setFunction(1, 2, 1);
    this.setFunction(2, 1, 1);
  }

  run() {
    const { func, value } = this._functions.get(this._function.value);

    switch(func) {
    case 0:
      this._result.value = this._input.value;
      break;
    case 1:
      this._result.value = this._input.value << value;
      break;
    case 2:
      this._result.value = this._input.value >> value;
      break;
    case 3:
      this._result.value = this._input.value >>> value;
      break;
    default:
      break;
    }

    return super.run();
  }

  serialize() {
    const cpnt = super.serialize();
    cpnt.functions = Array.from(this.functions);
    return cpnt;
  }

  deserialize(obj) {
    if (obj.functions) {
      this._functions = new Map(obj.functions);
    }
  }

  getFunction(index) {
    const func = this._functions.get(index);
    if (func !== undefined) {
      return { ...func };
    } else {
      return undefined;
    }
  }

  setFunction(index, func, value) {
    this._functions.set(index, { func, value });
  }

  removeFunction(index) {
    this._functions.delete(index);
  }
}

customElements.define('cpnt-shifter', Shifter);

export default Shifter;
