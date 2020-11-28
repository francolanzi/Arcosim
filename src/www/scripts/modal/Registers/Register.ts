class RegistersRegister extends HTMLElement {
  public readonly index: number;

  private readonly _input: HTMLInputElement;

  private _value: string;

  public get value(): string {
    return this._input.value;
  }

  public set value(value: string) {
    this._input.value = value;
  }

  public constructor(index: number, value: string) {
    super();

    this.index = index;

    this._value = value.toString();

    this._input = document.createElement('input');
    this._input.id = `register${index}`;
    this._input.type = 'text';
    this._input.value = value;
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = `Registro ${index} = `;
    label.setAttribute('for', this._input.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-registers-register', RegistersRegister);

export default RegistersRegister;
