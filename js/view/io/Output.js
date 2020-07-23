const IOElement = require('./IOElement');

class OutputElement extends IOElement {}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
