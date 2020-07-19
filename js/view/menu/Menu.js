class Menu extends HTMLElement
{
    constructor()
    {
        super();

        this._items = new Map();

        this.style.display = 'flex';
        this.style.flexDirection = 'row';
        this.style.justifyContent = 'start';
        this.style.alignItems = 'center';
        this.style.position = 'relative';
        this.style.zIndex = 1;
    }

    addItem(id, item)
    {
        if (!this._items.has(id))
        {
            this._items.set(id, item);
            this.appendChild(item);
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