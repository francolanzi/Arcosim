const IOElement = require('./IOElement');

class InputElement extends IOElement {}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
