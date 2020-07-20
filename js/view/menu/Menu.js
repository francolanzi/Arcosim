const StyledElement = require('../StyledElement');

class Menu extends StyledElement
{
    constructor()
    {
        super();

        this._items = new Map();

        this.addStyles('css/menu/Menu.css');
    }

    addItem(id, item)
    {
        if (!this._items.has(id))
        {
            this._items.set(id, item);
            this.shadow.appendChild(item);
        }
        return this.getItem(id);
    }

    getItem(id)
    {
        return this._items.get(id);
    }

    removeItem(id)
    {
        return this._items.delete(id);
    }
}

customElements.define('menu-items', Menu);

module.exports = Menu;