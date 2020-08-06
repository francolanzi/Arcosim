class UintInput extends HTMLInputElement {
  constructor(value, min, max, arrows) {
    super();

    function clamp(value, min, max) {
      value = Math.min(value, max);
      value = Math.max(value, min);
      return value;
    }

    min = Math.max(min, 0);
    max = Math.max(max, 0);
    value = clamp(value, min, max);

    this.type = arrows ? 'number' : 'text';
    this.value = value;
    this.min = min;
    this.max = max;
    this.step = 1;

    this.setAttribute('is', 'uint-input');

    this.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    this.addEventListener('keyup', ev => {
      if (this.value) {
        const value = parseInt(ev.target.value);
        this.value = clamp(value, min, max);
      }
    });

    this.addEventListener('change', () => {
      if (!this.value) {
        this.value = min;
      }
    });
  }
}

customElements.define('uint-input', UintInput, { extends: 'input' });

module.exports = UintInput;
