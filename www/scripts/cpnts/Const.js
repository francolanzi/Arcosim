import Component from '../Component.js';
import Config from '../modal/Const/Config.js';

class Const extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Const.svg',
      width: 99,
      height: 46,
    };
  }

  get config() {
    return new Config(this);
  }

  get value() {
    return this._const.default;
  }

  set value(value) {
    this._const.default = value;
    value = value >>> 0;
    value = value.toString(16);
    value = value.toUpperCase();
    value = value.padStart(8, '0');
    this._display.textContent = value;
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._const = this.addOutput('Constante', 49, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this.value = this._const.value;
  }
}

customElements.define('cpnt-const', Const);

export default Const;
