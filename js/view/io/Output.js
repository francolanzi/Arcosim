const IOElement = require('./IOElement');

class OutputElement extends IOElement {
  constructor(id, x, y) {
    super(id, x, y);

    this.addStyles('css/io/Output.css');
  }
}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
