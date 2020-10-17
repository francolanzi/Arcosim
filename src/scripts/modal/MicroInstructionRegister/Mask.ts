import MaskName from './MaskName.js';
import UintInput from '../UintInput.js';

class MicroInstructionRegisterMask extends HTMLElement {
  public readonly index: number;

  private readonly _maskName: MaskName;
  private readonly _maskSize: UintInput;

  public get name(): string {
    return this._maskName.value;
  }

  public get size(): number {
    return parseInt(this._maskSize.value);
  }

  public constructor(index: number, name: string, size: number) {
    super();

    this.index = index;

    this._maskName = new MaskName(name);
    this._maskSize = new UintInput(size, 1, 32, true);

    this.append(this._maskName);
    this.append(this._maskSize);
  }
}

customElements.define('cpnt-mir-mask', MicroInstructionRegisterMask);

export default MicroInstructionRegisterMask;
