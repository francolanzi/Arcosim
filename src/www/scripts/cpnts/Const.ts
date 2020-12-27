import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import CpntWithScreen from '../CpntWithScreen.js';
import ConstData from '../ifaces/data/ConstData.js';
import Output from '../io/Output.js';
import Config from '../modal/Const/Config.js';

class Const extends CpntWithScreen {
  private _const: string;

  private readonly _output: Output;

  public get config(): Config {
    return new Config(this);
  }

  public get const(): string {
    return this._const;
  }

  public set const(value: string) {
    const number = Number(value);

    if (value && !isNaN(number)) {
      this._const = value;
      this.value = number;
    }
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._output = this.addOutput('const', 'Constante', 70, 46);

    this._const = this._output.value.toString();
    this.const = this._const;
  }

  public run(time: number): boolean {
    this._output.value = this.value;
    return super.run(time);
  }

  public export(): ConstData {
    return {
      value: this.const,
      radix: this.radix,
    };
  }

  public import(data: ConstData): void {
    if (data.value) {
      this.const = data.value;
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

  public get defaultLabel(): string {
    return 'Const';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 139, 19);
  }

  public cpnt(top: number, left: number): Component {
    return new Const(this, top, left);
  }
}

customElements.define('cpnt-const', Const);
customElements.define('cpnt-item-const', ConstItem);

export { ConstItem, Const };
