const StyledElement = require('./StyledElement');

class FixedLayer extends StyledElement
{
    constructor()
    {
        super();

        this.addStyles('css/FixedLayer.css');
    }
}

customElements.define('fixed-layer', FixedLayer);

module.exports = FixedLayer;