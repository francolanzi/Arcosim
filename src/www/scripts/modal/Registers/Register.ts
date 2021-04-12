class RegistersRegister extends HTMLElement {
  public readonly index: number;

  private readonly _label: HTMLInputElement;
  private readonly _value: HTMLInputElement;

  public get label(): string {
    return this._label.value;
  }

  public get value(): string {
    return this._value.value;
  }

  public set value(value: string) {
    this._value.value = value;
  }

  public constructor(index: number, label: string, value: string) {
    super();

    this.index = index;

    this._label = document.createElement('input');
    this._label.type = 'text';
    this._label.value = label;

    this._value = document.createElement('input');
    this._value.type = 'text';
    this._value.value = value;

    const equals = document.createElement('label');
    equals.textContent = ` (${index.toString().padStart(2, '0')}) = `;

    this.append(this._label);
    this.append(equals);
    this.append(this._value);
  }
}

customElements.define('cpnt-registers-register', RegistersRegister);

export default RegistersRegister;
