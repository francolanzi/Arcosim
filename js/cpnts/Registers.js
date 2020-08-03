const Component = require('../Component');
const Config = require('../config/Registers');

class Registers extends Component {
  static get imageFile() {
    return 'img/cpnt/Registers.png';
  }

  get config() {
    return new Config(this);
  }

  get count() {
    return this._registers.length;
  }

  constructor(top, left) {
    super(top, left);

    this._registers = new Array(16).fill(0);

    this.addInput('DecoderA', 20.75, 0);
    this.addInput('DecoderB', 46.5, 0);
    this.addInput('DecoderC', 72.25, 0);
    this.addInput('Input', 0, 44.5);
    this.addInput('Clock', 0, 19.75);

    this.addOutput('OutputA', 93, 28);
    this.addOutput('OutputB', 93, 61);
  }

  addRegister() {
    this._registers.push(0);
    return this._registers.length - 1;
  }

  getRegister(index) {
    return this._registers[index];
  }

  setRegister(index, value) {
    if (index >= 0 && index < this._registers.length) {
      this._registers[index] = value;
    }
  }

  removeRegister() {
    this._registers.pop();
    return this._registers.length;
  }
}

customElements.define('cpnt-registers', Registers);

module.exports = Registers;
