const IOElement = require('./IO');

class OutputElement extends IOElement {
  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

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
}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
