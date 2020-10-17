import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Decoder extends Component {
  private readonly _encoded: Input;
  private readonly _enable: Input;
  private readonly _clock: Input;

  private readonly _decoded: Output;

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._encoded = this.addInput('Codificado', 77, 14.5);
    this._enable = this.addInput('Habilitar', 38.5, 0);
    this._clock = this.addInput('Clock', 38.5, 29);

    this._decoded = this.addOutput('Decodificado', 0, 14.5);

    this._enable.default = 1;
    this._clock.default = 1;
  }

  public run(time: number): boolean {
    if (this._clock.value && this._enable.value) {
      this._decoded.value = 1 << this._encoded.value;
    }

    return super.run(time);
  }
}

class DecoderItem extends CpntItem {
  public get type(): string {
    return 'Decoder';
  }

  public get image(): string {
    return 'images/cpnt/Decoder.svg';
  }

  public get width(): number {
    return 78;
  }

  public get height(): number {
    return 30;
  }

  public cpnt(top: number, left: number): Component {
    return new Decoder(this, top, left);
  }
}

customElements.define('cpnt-decoder', Decoder);
customElements.define('cpnt-item-decoder', DecoderItem);

export { DecoderItem, Decoder };
