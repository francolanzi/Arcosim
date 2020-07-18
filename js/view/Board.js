class Board extends HTMLElement
{
    constructor()
    {
        super();

        this._cpnts = new Map();

        this.style.display = 'block';
        this.style.backgroundColor = '#f8f9fa';
        this.style.padding = '0.5rem';
        this.style.width = '100%'
        this.style.height = '100%'
        this.style.boxSizing = 'border-box';
    }

    addCpnt(instance)
    {
        var key = instance.constructor.type + instance.cpnt.id;
        if (!this._cpnts.has(key))
        {
            this._cpnts.set(key, instance);
            this.appendChild(instance);
        }
        return this.getCpnt(key);
    }

    getCpnt(type, id)
    {
        return this._cpnts.get(type + id);
    }

    removeCpnt(type, id)
    {
        return this._cpnts.delete(type + id);
    }
}

customElements.define('cpnt-board', Board);

module.exports = Board;