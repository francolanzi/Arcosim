const IOElement = require('./IOElement');

class InputElement extends IOElement
{
    constructor(id, top, left)
    {
        super(id, top, left);

        this.classList.add('text-light');
    }
}

customElements.define('cpnt-input', InputElement, { extends: 'a' });

module.exports = InputElement;
