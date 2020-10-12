import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Config from '../modal/Const/Config.js';

class Const extends Component {
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

  serialize() {
    const cpnt = super.serialize();
    cpnt.value = this.value;
    return cpnt;
  }

  deserialize(obj) {
    if (obj.value) {
      this.value = obj.value;
    }
  }
}

class ConstItem extends CpntItem {
  get type() {
    return 'Const';
  }

  get image() {
    return 'images/cpnt/Const.svg';
  }

  get width() {
    return 99;
  }

  get height() {
    return 46;
  }

  cpnt(top, left) {
    return new Const(this, top, left);
  }
}

customElements.define('cpnt-const', Const);
customElements.define('cpnt-item-const', ConstItem);

export default ConstItem;
