const StyledElement = require('../StyledElement');

class IOElement extends StyledElement {
  get name() {
    return this._name;
  }

  get show() {
    return this.style.visibility == 'visible';
  }

  set show(show) {
    this.style.visibility = show ? 'visible' : 'hidden';
  }

  constructor(name, x, y) {
    super();

    this._name = name;

    this.addStyles('css/io/IOElement.css');

    this.style.position = 'absolute';
    this.style.top = (y - 4.5) + 'px';
    this.style.left = (x - 4.5) + 'px';
    this.style.visibility = 'hidden';
  }
}

module.exports = IOElement;
