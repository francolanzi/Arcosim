const TrashItem = require('./items/TrashItem');
const LinkItem = require('./items/LinkItem');
const CpntItem = require('./items/CpntItem');

class Menu extends HTMLElement
{
    constructor()
    {
        super();

        this._items = new Map();

        this._items.set('trash', new TrashItem());
        this._items.set('link', new LinkItem());
        this._items.set('cpnt', new CpntItem());

        this.appendChild(this.getItem('trash'));
        this.appendChild(this.getItem('link'));
        this.appendChild(this.getItem('cpnt'));

        this.style.display = 'flex';
        this.style.flexDirection = 'row';
        this.style.justifyContent = 'start';
        this.style.alignItems = 'center';
    }

    getItem(item)
    {
        return this._items.get(item);
    }
}

customElements.define('menu-items', Menu);

module.exports = Menu;