class LatchValue extends HTMLElement {
  private readonly _input: HTMLInputElement;

  public get value (): number {
    return parseInt(this._input.value);
  }

  public constructor (value: number) {
    super();

    this._input = document.createElement('input');
    this._input.id = 'value';
    this._input.type = 'number';
    this._input.value = value.toString();
    this._input.readOnly = true;

    const label = document.createElement('label');
    label.textContent = 'Valor = ';
    label.setAttribute('for', this._input.id);

    this.append(label);
    this.append(this._input);
  }
}

customElements.define('cpnt-latch-value', LatchValue);

export default LatchValue;
