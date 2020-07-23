const IOElement = require('./IOElement');

class OutputElement extends IOElement {
  constructor(name, x, y) {
    super(name, x, y);

    this.addStyles('css/io/Output.css');
  }
}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
