class IO extends HTMLElement {
  get cpnt() {
    return this._cpnt;
  }

  get name() {
    return this._name;
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

  constructor(cpnt, name, x, y) {
    super();

    if (this.constructor === IO) {
      throw new Error('IO class can not be instantiated');
    }

    this._cpnt = cpnt;
    this._name = name;
    this._center = { x, y };

    this.classList.add('io');

    this.tabIndex = 0;

    this.style.top = (y - 5) + 'px';
    this.style.left = (x - 5) + 'px';
  }
}

module.exports = IO;
