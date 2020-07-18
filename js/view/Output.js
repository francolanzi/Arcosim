const IOElement = require('./IOElement');

class OutputElement extends IOElement
{
    constructor(id, x, y)
    {
        super(id, x, y);

        this.classList.add('text-secondary');
    }
}

customElements.define('cpnt-output', OutputElement, { extends: 'a' });

module.exports = OutputElement;