class ControlStoreRowInput extends HTMLInputElement {
  constructor(value) {
    super();

    this.value = value;
    this.type = 'text';

    this.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    this.addEventListener('keyup', () => {
      if (this.value) {
        this.value = parseInt(this.value);
      }
    });

    this.addEventListener('change', () => {
      if (!this.value) {
        this.value = 0;
      }
    });
  }
}

customElements.define('control-store-row-input', ControlStoreRowInput, { extends: 'input' });

module.exports = ControlStoreRowInput;
