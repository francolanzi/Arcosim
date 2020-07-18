const IOElement = require('./IOElement');

class InputElement extends IOElement
{
    constructor(id, x, y)
    {
        super(id, x, y);

        this.classList.add('text-light');
    }
}

customElements.define('cpnt-input', InputElement, { extends: 'a' });

module.exports = InputElement;
