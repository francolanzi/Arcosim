const IOElement = require('./IO');

class OutputElement extends IOElement {}

customElements.define('cpnt-output', OutputElement);

module.exports = OutputElement;
