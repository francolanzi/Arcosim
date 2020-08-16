const Component = require('../Component');
const Config = require('../config/Registers');

class Registers extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Registers.svg',
      width: 94,
      height: 90,
    };
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

    this._decoderA = this.addInput('Decoder A', 20.75, 0);
    this._decoderB = this.addInput('Decoder B', 46.5, 0);
    this._decoderC = this.addInput('Decoder C', 72.25, 0);
    this._inputC = this.addInput('C', 0, 44.5);
    this._clock = this.addInput('Clock', 0, 19.75);

    this._outputA = this.addOutput('A', 93, 28);
    this._outputB = this.addOutput('B', 93, 61);
  }

  run() {
    function encode(decoded) {
      let count = -1;
      while (decoded) {
        decoded = decoded >> 1;
        count++;
      }
      return count;
    }

    const indexA = encode(this._decoderA.value);
    const indexB = encode(this._decoderB.value);
    const indexC = encode(this._decoderC.value);

    if (indexA >= 0 && indexA < this._registers.length) {
      this._outputA.value = this._registers[indexA];
    }

    if (indexB >= 0 && indexB < this._registers.length) {
      this._outputB.value = this._registers[indexB];
    }

    if (this._clock.value && indexC >= 0 && indexC < this._registers.length) {
      this._registers[indexC] = this._inputC.value;
    }

    return super.run();
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
