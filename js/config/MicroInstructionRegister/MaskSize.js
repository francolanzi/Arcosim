class MicroInstructionRegisterMaskSize extends HTMLInputElement {
  constructor(size) {
    super();

    this.type = 'number';
    this.value = size;
    this.min = 1;
    this.max = 32;
    this.step = 1;

    this.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    this.addEventListener('keyup', ev => {
      if (this.value) {
        this.value = Math.max(Math.min(parseInt(ev.target.value), 32), 1);
      }
    });

    this.addEventListener('change', () => {
      if (!this.value) {
        this.value = 1;
      }
    });
  }
}

customElements.define('cpnt-mir-mask-size', MicroInstructionRegisterMaskSize, { extends: 'input' });

module.exports = MicroInstructionRegisterMaskSize;
