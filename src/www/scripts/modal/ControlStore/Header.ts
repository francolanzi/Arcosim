import Mask from '../../ifaces/Mask';

class ControlStoreHeader extends HTMLElement {
  private _bits: number;

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    this._bits = bits;
    this.style.width = `${1.25 * bits}rem`;
  }

  public constructor(masks: Array<Mask>, bits: number) {
    super();

    this._bits = bits;
    this.bits = this._bits;

    let margin = 0;

    for (let i = masks.length - 1; i >= 0; i--) {
      const label = document.createElement('div');
      label.style.width = `${1.25 * masks[i].size}rem`;
      label.style.right = `${1.25 * margin}rem`;
      label.innerText = masks[i].name;
      this.append(label);
      margin += masks[i].size;
    }
  }
}

customElements.define('cpnt-cs-header', ControlStoreHeader);

export default ControlStoreHeader;
