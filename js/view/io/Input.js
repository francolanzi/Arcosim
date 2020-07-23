const IOElement = require('./IOElement');

class InputElement extends IOElement {
  constructor(name, x, y) {
    super(name, x, y);

    this.addStyles('css/io/Input.css');
  }
}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
