const IOElement = require('./IO');

class OutputElement extends IOElement {
  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    let clicked = false;

    this.addEventListener('mousedown', () => clicked = true);
    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', () => {
      if (!clicked) {
        this.blur();
      }
    });
  }
}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
