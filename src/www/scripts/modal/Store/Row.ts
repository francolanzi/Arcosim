import UintInput from '../UintInput.js';
import ImgButton from '../ImgButton.js';

class StoreRow extends HTMLElement {
  private _instruction: number;
  private _bits: number;

  private readonly _inputs: Array<UintInput>;

  public get position(): number {
    if (this.parentNode) {
      const childs = this.parentNode.childNodes;
      return Array.prototype.indexOf.call(childs, this);
    } else {
      return 0;
    }
  }

  public get instruction(): number {
    return this._instruction;
  }

  public get active(): boolean {
    return this.classList.contains('active');
  }

  public set active(active: boolean) {
    this.classList.toggle('active', active);
  }

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    this._instruction &= 0xFFFFFFFF >>> (32 - bits);
    this._bits = bits;
    this.reload();
  }

  public constructor(instruction: number, bits: number) {
    super();

    this._instruction = instruction;
    this._bits = bits;
    this._inputs = [];

    const addBefore = new ImgButton('Agregar antes', 'images/modal/plus.svg');
    const addAfter = new ImgButton('Agregar después', 'images/modal/plus.svg');
    const remove = new ImgButton('Quitar', 'images/modal/minus.svg');

    this.append(addBefore);
    this.append(remove);
    this.append(addAfter);

    addBefore.addEventListener('click', () =>
      this.dispatchEvent(new Event('addbefore')));

    addAfter.addEventListener('click', () =>
      this.dispatchEvent(new Event('addafter')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));

    this.reload();
  }

  public reload(): void {
    let input = this._inputs.pop();
    while (input) {
      input.remove();
      input = this._inputs.pop();
    }

    for (let i = 0; i < this.bits; i++) {
      const value = (this.instruction >> i) & 1;

      this._inputs[i] = new UintInput(value, 0, 0xFFFFFFFF, false);

      this._inputs[i].addEventListener('change', ev => {
        const input = <UintInput> ev.target;
        let i = this._inputs.indexOf(input);
        let value = parseInt(input.value);

        while (value > 0 && i < this._bits) {
          this._inputs[i].value = (value & 1).toString();
          value = value >>> 1;
          i++;
        }

        this._instruction = 0;
        for (let i = 0; i < this._bits; i++) {
          this._instruction += parseInt(this._inputs[i].value) << i;
        }

        this.active = false;
      });

      const firstChild = <Element> this.firstChild;
      firstChild.insertAdjacentElement('afterend', this._inputs[i]);
    }
  }
}

customElements.define('cpnt-store-row', StoreRow);

export default StoreRow;
