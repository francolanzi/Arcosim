import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import ConstInfo from '../ifaces/cpntInfo/ConstInfo.js';
import Output from '../io/Output.js';
import Config from '../modal/Const/Config.js';

class Const extends Component {
  private _value: string;

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

    let text = this._const.default.toString(16);

    text = text.toUpperCase();
    text = text.padStart(8, '0');

    this._display.textContent = text;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._const = this.addOutput('const', 'Constante', 49, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this._value = this._const.value.toString();
    this.value = this._value;
  }

  public serialize(): ConstInfo {
    const cpnt = <ConstInfo> super.serialize();
    cpnt.value = this.value;
    return cpnt;
  }

  public deserialize(obj: ConstInfo): void {
    if (obj.value) {
      this.value = obj.value;
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
    return 99;
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
