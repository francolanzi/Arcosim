import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Encoder extends Component {
  private readonly _decoded: Input;
  private readonly _enable: Input;
  private readonly _clock: Input;

  private readonly _encoded: Output;

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._decoded = this.addInput('decoded', 'Decodificado', 77, 14.5);
    this._enable = this.addInput('enable', 'Habilitar', 38.5, 0);
    this._clock = this.addInput('clock', 'Clock', 38.5, 29);

    this._encoded = this.addOutput('encoded', 'Codificado', 0, 14.5);

    this._enable.default = 1;
    this._clock.default = 1;
  }

  public run(time: number): boolean {
    if (this._clock.value && this._enable.value) {
      let decoded = this._decoded.value;
      let encoded = -1;

      while (decoded) {
        decoded = decoded >>> 1;
        encoded++;
      }

      this._encoded.value = encoded;
    }

    return super.run(time);
  }

  public export(): undefined {
    return undefined;
  }

  public import(): void {
    // nothing
  }
}

class EncoderItem extends CpntItem {
  public get type(): string {
    return 'Encoder';
  }

  public get image(): string {
    return 'images/cpnt/Encoder.svg';
  }

  public get width(): number {
    return 78;
  }

  public get height(): number {
    return 30;
  }

  public cpnt(top: number, left: number): Component {
    return new Encoder(this, top, left);
  }
}

customElements.define('cpnt-encoder', Encoder);
customElements.define('cpnt-item-encoder', EncoderItem);

export { EncoderItem, Encoder };
