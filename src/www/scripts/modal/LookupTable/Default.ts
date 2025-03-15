class LookupTableDefault extends HTMLElement {
  private readonly _input: HTMLInputElement;

  public get value (): number {
    return parseInt(this._input.value);
  }

  public constructor (value: number) {
    super();

    this._input = document.createElement('input');
    this._input.id = 'default';
    this._input.type = 'number';
    this._input.value = value.toString();

    const arrow = document.createElement('div');
    arrow.textContent = '->';

    const label = document.createElement('label');
    label.textContent = 'Default';
    label.setAttribute('for', this._input.id);

    this.append(label);
    this.append(arrow);
    this.append(this._input);
  }
}

customElements.define('cpnt-lut-default', LookupTableDefault);

export default LookupTableDefault;
