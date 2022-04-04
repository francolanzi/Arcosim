class UintInput extends HTMLInputElement {
  public constructor (value: number, min: number, max: number, arrows: boolean) {
    super();

    min = Math.max(min, 0);
    max = Math.max(max, 0);
    value = this.clamp(value, min, max);

    this.type = arrows ? 'number' : 'text';
    this.value = value.toString();
    this.min = min.toString();
    this.max = max.toString();
    this.step = '1';

    this.setAttribute('is', 'uint-input');

    this.addEventListener('keydown', ev => {
      if (ev.key.length === 1 && (ev.key < '0' || ev.key > '9')) {
        ev.preventDefault();
      }
    });

    this.addEventListener('keyup', () => {
      if (this.value) {
        const value = parseInt(this.value);
        this.value = this.clamp(value, min, max).toString();
      }
    });

    this.addEventListener('change', () => {
      if (!this.value) {
        this.value = min.toString();
      }
    });
  }

  private clamp (value: number, min: number, max: number) {
    value = Math.min(value, max);
    value = Math.max(value, min);
    return value;
  }
}

customElements.define('uint-input', UintInput, { extends: 'input' });

export default UintInput;
