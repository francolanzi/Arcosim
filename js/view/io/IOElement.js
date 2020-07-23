class IOElement extends HTMLElement {
  get cpnt() {
    return this._cpnt;
  }

  get name() {
    return this._name;
  }

  get show() {
    return this.style.visibility == 'visible';
  }

  set show(show) {
    this.style.visibility = show ? 'visible' : 'hidden';
  }

  constructor(cpnt, name, x, y) {
    super();

    if (this.constructor == IOElement) {
      throw new Error('IOElement class can not be instantiated');
    }

    this._cpnt = cpnt;
    this._name = name;

    this.classList.add('io');

    this.style.position = 'absolute';
    this.style.top = (y - 4.5) + 'px';
    this.style.left = (x - 4.5) + 'px';
    this.style.visibility = 'hidden';
  }
}

module.exports = IOElement;
