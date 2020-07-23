const IOElement = require('./IO');

class InputElement extends IOElement {}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
