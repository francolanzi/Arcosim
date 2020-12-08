import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import DisplayData from '../ifaces/data/DisplayData.js';
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

    this._input = this.addInput('input', 'Entrada', 70, 0);

    this._output = this.addOutput('output', 'Salida', 70, 46);

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
    let text = '';

    switch (this._radix) {
    case 2:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0b' + text.padStart(11, '0');
      break;
    case 8:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 11);
      text = '0o' + text.padStart(11, '0');
      break;
    case 16:
      text = (this._value >>> 0).toString(this._radix);
      text = text.toUpperCase();
      text = text.slice(0, 8);
      text = '0x' + text.padStart(8, '0');
      break;
    default:
      text = this._value.toString(this._radix);
      text = text.toUpperCase();
      break;
    }

    this._display.textContent = text;
  }

  public export(): DisplayData {
    return {
      radix: this.radix,
    };
  }

  public import(data: DisplayData): void {
    if (data.radix) {
      this.radix = data.radix;
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
    return 141;
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
