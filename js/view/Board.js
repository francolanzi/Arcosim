class Board extends HTMLElement
{
    constructor()
    {
        super();

        this._cpnts = new Map();

        this.style.display = 'block';

        this.classList.add('bg-light');
        this.classList.add('p-2');
        this.classList.add('h-100');
        this.classList.add('w-100');
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