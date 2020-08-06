class IO extends HTMLElement {
  get cpnt() {
    return this._cpnt;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
    this.title = `${name} = ${this._value}`;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._changed = true;
    }
    this.title = `${this._name} = ${value}`;
  }

  get changed() {
    const changed = this._changed;
    this._changed = false;
    return changed;
  }

  get show() {
    return this.classList.contains('show');
  }

  set show(show) {
    this.classList.toggle('show', show);
  }

  get center() {
    const x = this._center.x + this._cpnt.left;
    const y = this._center.y + this._cpnt.top;
    return { x, y };
  }

  get x() {
    return this._center.x;
  }

  set x(x) {
    if (x !== this._center.x) {
      this._center.x = x;
      this.style.left = `${x - 5}px`;
      this.dispatchEvent(new Event('move', { bubbles: true }));
    }
  }

  get y() {
    return this._center.y;
  }

  set y(y) {
    if (y !== this._center.y) {
      this._center.y = y;
      this.style.top = `${y - 5}px`;
      this.dispatchEvent(new Event('move', { bubbles: true }));
    }
  }

  constructor(cpnt, name, x, y) {
    super();

    if (this.constructor === IO) {
      throw new Error('IO class can not be instantiated');
    }

    this._value = 0;
    this._changed = true;

    this._cpnt = cpnt;
    this.name = name;
    this._center = {};

    this.classList.add('io');

    this.tabIndex = 0;

    this.x = x;
    this.y = y;
  }

  reset() {
    this.value = 0;
  }
}

module.exports = IO;
