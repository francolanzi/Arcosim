import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';

class Multiplexer extends Component {
  private readonly _inputA: Input;
  private readonly _inputB: Input;
  private readonly _control: Input;

  private readonly _output: Output;

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._inputA = this.addInput('A', 18.5, 0);
    this._inputB = this.addInput('B', 42.5, 0);
    this._control = this.addInput('Control', 61, 11);

    this._output = this.addOutput('Salida', 30.5, 22);
  }

  public run(time: number): boolean {
    this._output.value = this._control.value ?
      this._inputB.value : this._inputA.value;

    return super.run(time);
  }
}

class MultiplexerItem extends CpntItem {
  public get type(): string {
    return 'Multiplexer';
  }

  public get image(): string {
    return 'images/cpnt/Multiplexer.svg';
  }

  public get width(): number {
    return 62;
  }

  public get height(): number {
    return 23;
  }

  public cpnt(top: number, left: number): Component {
    return new Multiplexer(this, top, left);
  }
}

customElements.define('cpnt-mux', Multiplexer);
customElements.define('cpnt-item-mux', MultiplexerItem);

export { MultiplexerItem, Multiplexer };
