const Input = require('./RowInput');
const Button = require('./RowButton');

class ControlStoreRow extends HTMLElement {
  get position() {
    const childs = this.parentNode.childNodes;
    return Array.prototype.indexOf.call(childs, this);
  }

  get instruction() {
    return this._instruction;
  }

  get bits() {
    return this._bits;
  }

  set bits(bits) {
    this._instruction &= (1 << bits) - 1;
    this._bits = bits;
    this.reload();
  }

  constructor(instruction, bits) {
    super();

    this._instruction = instruction;
    this._bits = bits;
    this._inputs = [];

    const addBefore = new Button('img/modal/plus.svg');
    const addAfter = new Button('img/modal/plus.svg');
    const remove = new Button('img/modal/minus.svg');

    this.appendChild(addBefore);
    this.appendChild(remove);
    this.appendChild(addAfter);

    addBefore.addEventListener('click', () =>
      this.dispatchEvent(new Event('addbefore')));

    addAfter.addEventListener('click', () =>
      this.dispatchEvent(new Event('addafter')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));

    this.reload();
  }

  reload() {
    let input = this._inputs.pop();
    while (input) {
      input.remove();
      input = this._inputs.pop();
    }

    for (let i = 0; i < this.bits; i++) {
      const value = (this.instruction >> i) & 1;

      this._inputs[i] = new Input(value);

      this._inputs[i].addEventListener('change', ev => {
        let i = this._inputs.indexOf(ev.target);
        let value = parseInt(ev.target.value);

        while (value > 0 && i < this._bits) {
          this._inputs[i].value = value & 1;
          value = value >>> 1;
          i++;
        }

        this._instruction = 0;
        for (let i = 0; i < this._bits; i++) {
          this._instruction += this._inputs[i].value << i;
        }
      });

      this.firstChild.insertAdjacentElement('afterend', this._inputs[i]);
    }
  }
}

customElements.define('cpnt-cs-row', ControlStoreRow);

module.exports = ControlStoreRow;
