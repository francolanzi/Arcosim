const IOElement = require('./IOElement');

class InputElement extends IOElement
{
    constructor(id, x, y)
    {
        super(id, x, y);

        this.style.color = '#f8f9fa';

        this.addEventListener('mouseenter', () => this.style.color = '#cbd3da');
        this.addEventListener('mouseleave', () => this.style.color = '#f8f9fa');
    }
}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
