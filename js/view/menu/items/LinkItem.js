const MenuItem = require('../MenuItem');

class LinkItem extends MenuItem
{
    static get title()
    {
        return 'Conectar';
    }

    static get icon()
    {
        return 'fa-project-diagram';
    }
}

customElements.define('link-item', LinkItem, { extends: 'a' });

module.exports = LinkItem;