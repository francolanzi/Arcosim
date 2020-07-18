const IOElement = require('./IOElement');

class OutputElement extends IOElement
{
    constructor(id, x, y)
    {
        super(id, x, y);

        this.style.color = '#343a40';

        this.addEventListener('mouseenter', () => this.style.color = '#121416');
        this.addEventListener('mouseleave', () => this.style.color = '#343a40');
    }
}

customElements.define('cpnt-output', OutputElement, { extends: 'a' });

module.exports = OutputElement;