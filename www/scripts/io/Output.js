import IO from './IO.js';

class Output extends IO {
  get id() {
    return this._id;
  }

  get value() {
    return super.value;
  }

  set value(value) {
    super.value = value;
    this._links.forEach(link => link.value = value);
  }

  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._links = new Set();

    let clicked = false;
    let focused = false;

    this.addEventListener('mousedown', () => {
      if (focused) {
        this.blur();
      } else {
        clicked = true;
      }
    });

    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', () => {
      if (clicked) {
        focused = true;
      } else {
        this.blur();
      }
    });

    this.addEventListener('blur', () => focused = false);
  }

  addLink(link) {
    this._links.add(link);
    link.value = this.value;
  }

  removeLink(link) {
    this._links.delete(link);
  }
}

customElements.define('cpnt-output', Output);

export default Output;
