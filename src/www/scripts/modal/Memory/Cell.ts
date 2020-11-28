class MemoryCell extends HTMLElement {
  public readonly index: number;

  private readonly _input: HTMLInputElement;

  public get value(): string {
    return this._input.value;
  }

  public set value(value: string) {
    this._input.value = value;
  }

  public constructor(index: number, value: string) {
    super();

    this.index = index;

    this._input = document.createElement('input');
    this._input.id = `cell${index}`;
    this._input.type = 'text';
    this._input.value = value;
    this.append(this._input);

    const label = document.createElement('label');
    label.textContent = `[${index.toString(16).padStart(4, '0')}]:`;
    label.setAttribute('for', this._input.id);
    this.prepend(label);
  }
}

customElements.define('memory-cell', MemoryCell);

export default MemoryCell;
