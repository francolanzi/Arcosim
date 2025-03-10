import UintInput from '../UintInput.js';

class AssemblerMask extends HTMLElement {
  public readonly index: number;

  private readonly _maskName: HTMLInputElement;
  private readonly _maskSize: UintInput;

  public get name (): string {
    return this._maskName.value;
  }

  public get size (): number {
    return parseInt(this._maskSize.value);
  }

  public constructor (index: number, name: string, size: number) {
    super();

    this.index = index;

    this._maskName = document.createElement('input');
    this._maskSize = new UintInput(size, 1, 32, true);

    this._maskName.value = name;
    this._maskName.type = 'text';
    this._maskName.placeholder = 'Nombre';

    this.append(this._maskName);
    this.append(this._maskSize);
  }
}

customElements.define('cpnt-assembler-mask', AssemblerMask);

export default AssemblerMask;
