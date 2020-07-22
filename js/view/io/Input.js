const IOElement = require('./IOElement');

class InputElement extends IOElement {
  constructor(id, x, y) {
    super(id, x, y);

    this.addStyles('css/io/Input.css');
  }
}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
