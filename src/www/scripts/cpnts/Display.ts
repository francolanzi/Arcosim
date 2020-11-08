import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import DisplayInfo from '../ifaces/cpntInfo/DisplayInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Display/Config.js';

class Display extends Component {
  private _value: number;
  private _radix: number;

  private readonly _input: Input;

  private readonly _output: Output;

  private readonly _display: HTMLDivElement;

  public get config(): Config {
    return new Config(this);
  }

  public get value(): number {
    return parseInt(this._display.textContent || '', 16);
  }

  public set value(value: number) {
    this._value = value;
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

    this._input = this.addInput('input', 'Entrada', 49, 0);

    this._output = this.addOutput('output', 'Salida', 49, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this._value = this._output.value;
    this._radix = 16;
    this.value = this._value;
  }

  public run(time: number): boolean {
    this.value = this._input.value;
    this._output.value = this._input.value;

    return super.run(time);
  }

  public reset(): void {
    super.reset();
    this.value = this._output.value;
  }

  private _updateDisplay() {
    let text = this._value.toString(this._radix);

    text = text.toUpperCase();
    text = text.padStart(8, '0');

    this._display.textContent = text;
  }

  public serialize(): DisplayInfo {
    const cpnt = <DisplayInfo> super.serialize();
    cpnt.radix = this.radix;
    return cpnt;
  }

  public deserialize(obj: DisplayInfo): void {
    if (obj.radix) {
      this.radix = obj.radix;
    }
  }
}

class DisplayItem extends CpntItem {
  public get type(): string {
    return 'Display';
  }

  public get image(): string {
    return 'images/cpnt/Display.svg';
  }

  public get width(): number {
    return 99;
  }

  public get height(): number {
    return 46;
  }

  public cpnt(top: number, left: number): Component {
    return new Display(this, top, left);
  }
}

customElements.define('cpnt-display', Display);
customElements.define('cpnt-item-display', DisplayItem);

export { DisplayItem, Display };
