class ControlStoreGrid extends HTMLElement {
  private _bits: number;

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    this._bits = bits;
    this.style.width = `${1.25 * (bits - 1)}rem`;
  }

  public constructor(sizes: Array<number>, bits: number) {
    super();

    this._bits = bits;
    this.bits = this._bits;

    let margin = 0;

    for (let i = sizes.length - 1; i > 0; i--) {
      margin += sizes[i];
      const border = document.createElement('div');
      border.style.right = `${1.25 * margin}rem`;
      this.append(border);
    }
  }
}

customElements.define('cpnt-cs-grid', ControlStoreGrid);

export default ControlStoreGrid;
