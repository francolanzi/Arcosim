const IOElement = require('./IOElement');

class OutputElement extends IOElement {
  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    this.addStyles('css/io/Output.css');
  }
}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
