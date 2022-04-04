import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import CpntWithScreen from '../CpntWithScreen.js';
import DisplayData from '../ifaces/data/DisplayData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Display/Config.js';

class Display extends CpntWithScreen {
  private readonly _input: Input;

  private readonly _output: Output;

  public get config (): Config {
    return new Config(this);
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._input = this.addInput('input', 'Entrada', 70, 0);

    this._output = this.addOutput('output', 'Salida', 70, 46);

    this.value = this._output.value;
  }

  public run (time: number): boolean {
    this.value = this._input.value;
    this._output.value = this._input.value;

    return super.run(time);
  }

  public reset (): void {
    super.reset();
    this.value = this._output.value;
  }

  public export (): DisplayData {
    return {
      radix: this.radix
    };
  }

  public import (data: DisplayData): void {
    if (data.radix) {
      this.radix = data.radix;
    }
  }
}

class DisplayItem extends CpntItem {
  public get type (): string {
    return 'Display';
  }

  public get image (): string {
    return 'images/cpnt/Display.svg';
  }

  public get width (): number {
    return 141;
  }

  public get height (): number {
    return 46;
  }

  public get defaultLabel (): string {
    return 'Display';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 139, 19);
  }

  public cpnt (top: number, left: number): Component {
    return new Display(this, top, left);
  }
}

customElements.define('cpnt-display', Display);
customElements.define('cpnt-item-display', DisplayItem);

export { DisplayItem, Display };
