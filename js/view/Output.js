const IOElement = require('./IOElement');

class OutputElement extends IOElement
{
    constructor(id, top, left)
    {
        super(id, top, left);

        this.classList.add('text-secondary');
    }
}

customElements.define('cpnt-output', OutputElement, { extends: 'a' });

module.exports = OutputElement;