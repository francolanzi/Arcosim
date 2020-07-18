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

    constructor(gallery)
    {
        super();

        this.addEventListener('click', () =>
            gallery.open = !gallery.open);
    }
}

customElements.define('cpnt-item', CpntItem);

module.exports = CpntItem;