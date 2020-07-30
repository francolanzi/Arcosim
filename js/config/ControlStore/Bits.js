class ControlStoreBits extends HTMLElement {
  constructor(bits) {
    super();

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 32;
    input.step = 1;
    input.value = bits;
    input.id = 'bits';
    this.appendChild(input);

    input.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    input.addEventListener('keyup', ev => {
      if (ev.target.value) {
        ev.target.value = Math.max(Math.min(parseInt(ev.target.value), 32), 1);
      }
    });

    input.addEventListener('change', () => {
      if (!input.value) {
        input.value = 1;
      }

      const value = parseInt(input.value);
      const event = new CustomEvent('bits', { detail: value });
      this.dispatchEvent(event);
    });

    const label = document.createElement('label');
    label.textContent = 'bits';
    label.setAttribute('for', 'bits');
    this.appendChild(label);
  }
}

customElements.define('control-store-bits', ControlStoreBits);

module.exports = ControlStoreBits;
