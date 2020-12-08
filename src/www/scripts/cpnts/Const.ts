import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ConstData from '../ifaces/data/ConstData.js';
import Output from '../io/Output.js';
import Config from '../modal/Const/Config.js';

class Const extends Component {
  private _value: string;
  private _radix: number;

  private readonly _const: Output;
  private readonly _display: HTMLDivElement;

  public get config(): Config {
    return new Config(this);
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    const number = Number(value);

    if (value && !isNaN(number)) {
      this._value = value;
      this._const.default = number;
    }

    this._updateDisplay();
  }

  public get radix(): number {
    return this._radix;
  }

  public set radix(radix: number) {
    if (radix >= 2 && radix <= 36) {
      this._radix = radix;
      this._updateDisplay();
    }
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._const = this.addOutput('const', 'Constante', 70, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this._value = this._const.value.toString();
    this._radix = 16;
    this.value = this._value;
  }

  private _updateDisplay() {
    let text = '';

    switch (this._radix) {
    case 2:
      text = (this._const.default >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0b' + text.padStart(11, '0');
      break;
    case 8:
      text = (this._const.default >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0o' + text.padStart(11, '0');
      break;
    case 16:
      text = (this._const.default >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 8);
      text = '0x' + text.padStart(8, '0');
      break;
    default:
      text = this._const.default.toString(this._radix);
      text = text.toUpperCase();
      break;
    }

    this._display.textContent = text;
  }

  public export(): ConstData {
    return {
      value: this.value,
      radix: this.radix,
    };
  }

  public import(data: ConstData): void {
    if (data.value) {
      this.value = data.value;
    }

    if (data.radix) {
      this.radix = data.radix;
    }
  }
}

class ConstItem extends CpntItem {
  public get type(): string {
    return 'Const';
  }

  public get image(): string {
    return 'images/cpnt/Const.svg';
  }

  public get width(): number {
    return 141;
  }

  public get height(): number {
    return 46;
  }

  public cpnt(top: number, left: number): Component {
    return new Const(this, top, left);
  }
}

customElements.define('cpnt-const', Const);
customElements.define('cpnt-item-const', ConstItem);

export { ConstItem, Const };
