const MenuItem = require('../MenuItem');

class CpntItem extends MenuItem
{
    static get title()
    {
        return 'Componentes';
    }

    static get icon()
    {
        return 'fa-puzzle-piece';
    }

    constructor()
    {
        super();

        this.anchor.href = '#gallery';
        this.anchor.setAttribute('data-toggle', 'collapse');
    }
}

customElements.define('cpnt-item', CpntItem);

module.exports = CpntItem;