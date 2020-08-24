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

  get default() {
    return super.default;
  }

  set default(_default) {
    super.default = _default;
    this.value = _default;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = width;
    this._links.forEach(link => link.width = width);
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
    this._links.forEach(link => link.color = color);
  }

  get dashed() {
    return this._dashed;
  }

  set dashed(dashed) {
    this._dashed = dashed;
    this._links.forEach(link => link.dashed = dashed);
  }

  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    if (!this.constructor._count) {
      this.constructor._count = 0;
    }
    this._id = ++this.constructor._count;

    this._links = new Set();

    this.width = 1;
    this.color = 'black';
    this.dashed = false;

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
    link.width = this.width;
    link.color = this.color;
    link.dashed = this.dashed;
  }

  removeLink(link) {
    this._links.delete(link);
  }
}

customElements.define('cpnt-output', Output);

export default Output;
