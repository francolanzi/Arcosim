import Component from '../Component.js';
import Config from '../modal/Const/Config.js';

class Const extends Component {
  static get svg() {
    return {
      src: 'images/cpnt/Const.svg',
      width: 64,
      height: 20,
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
  }

  constructor(computer, top, left) {
    super(computer, top, left);

    this._const = this.addOutput('Constante', 31.5, 19);
  }
}

customElements.define('cpnt-const', Const);

export default Const;
