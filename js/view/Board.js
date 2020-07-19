const StyledElement = require('./StyledElement');

class Board extends StyledElement
{
    constructor()
    {
        super();

        this._cpnts = new Map();

        this.addStyles('css/Board.css');
    }

    addCpnt(instance)
    {
        var key = instance.constructor.type + instance.cpnt.id;
        if (!this._cpnts.has(key))
        {
            this._cpnts.set(key, instance);
            this.shadow.appendChild(instance);

            instance.addEventListener('drag', () =>
                document.body.appendChild(instance));
            
            instance.addEventListener('drop', () =>
                this.shadow.appendChild(instance));
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