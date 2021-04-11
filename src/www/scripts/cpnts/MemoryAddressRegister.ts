import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/MemoryAddressRegister/Config.js';

class MemoryAddressRegister extends Component {
  private _value: number;

  private readonly _control: Input;
  private readonly _clock: Input;
  private readonly _addrin: Input;

  private readonly _addrout: Output;

  public get config(): Config {
    return new Config(this);
  }

  public get value(): number {
    return this._value;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._value = 0;

    this._control = this.addInput('control', 'Control', 23, 19);
    this._clock = this.addInput('clock', 'Clock', 23, 0);
    this._addrin = this.addInput('addrin', 'Dirección', 46, 9.5);

    this._addrout = this.addOutput('addrout', 'Bus de direcciones', 0, 9.5);
  }

  public run(time: number): boolean {
    if (this._clock.value) {
      if (this._control.value) {
        this._value = this._addrin.value;
      }
    } else {
      this._addrout.value = this._value;
    }

    return super.run(time);
  }
}

class MemoryAddressRegisterItem extends CpntItem {
  public get type(): string {
    return 'Memory Address Register';
  }

  public get image(): string {
    return 'images/cpnt/MemoryAddressRegister.svg';
  }

  public get width(): number {
    return 47;
  }

  public get height(): number {
    return 20;
  }

  public get defaultLabel(): string {
    return 'MAR';
  }

  public get labelRect(): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 45, 18);
  }

  public cpnt(top: number, left: number): Component {
    return new MemoryAddressRegister(this, top, left);
  }
}

customElements.define('cpnt-mar', MemoryAddressRegister);
customElements.define('cpnt-item-mar', MemoryAddressRegisterItem);

export { MemoryAddressRegisterItem, MemoryAddressRegister };
