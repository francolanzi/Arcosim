import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Display extends Component {
  private readonly _input: Input;

  private readonly _output: Output;

  private readonly _display: HTMLDivElement;

  public get value(): number {
    return parseInt(this._display.textContent || '', 16);
  }

  public set value(value: number) {
    value = value >>> 0;
    let text = value.toString(16);
    text = text.toUpperCase();
    text = text.padStart(8, '0');
    this._display.textContent = text;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._input = this.addInput('input', 'Entrada', 49, 0);

    this._output = this.addOutput('output', 'Salida', 49, 46);

    this._display = document.createElement('div');
    this.append(this._display);

    this.value = this._output.value;
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
