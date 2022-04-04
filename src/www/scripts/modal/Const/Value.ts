class ConstValue extends HTMLElement {
  private readonly _input: HTMLInputElement;

  public get value (): string {
    return this._input.value;
  }

  public set value (value: string) {
    this._input.value = value;
  }

  public constructor (value: string) {
    super();

    this._input = document.createElement('input');
    this._input.id = 'const-value';
    this._input.value = value;
    this._input.type = 'text';

    const label = document.createElement('label');
    label.textContent = 'Constante = ';
    label.setAttribute('for', this._input.id);

    this.append(label);
    this.append(this._input);
  }
}

customElements.define('cpnt-const-value', ConstValue);

export default ConstValue;
