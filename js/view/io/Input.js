const IOElement = require('./IOElement');

class InputElement extends IOElement {
  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    this.addStyles('css/io/Input.css');
  }
}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
