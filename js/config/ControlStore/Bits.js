class ControlStoreBits extends HTMLElement {
  get value() {
    return this._input.value;
  }

  constructor(bits) {
    super();

    this._input = document.createElement('input');
    this._input.type = 'number';
    this._input.min = 1;
    this._input.max = 32;
    this._input.step = 1;
    this._input.value = bits;
    this._input.id = 'bits';
    this.appendChild(this._input);

    this._input.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    this._input.addEventListener('keyup', ev => {
      if (ev.target.value) {
        ev.target.value = Math.max(Math.min(parseInt(ev.target.value), 32), 1);
      }
    });

    this._input.addEventListener('change', () => {
      if (!this._input.value) {
        this._input.value = 1;
      }
    });

    const label = document.createElement('label');
    label.textContent = 'bits';
    label.setAttribute('for', 'bits');
    this.appendChild(label);
  }
}

customElements.define('cpnt-cs-bits', ControlStoreBits);

module.exports = ControlStoreBits;
