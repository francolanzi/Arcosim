const { _count } = require("./classes/ALU");

class Component
{
    static _count = new Map();

    static get image()
    {
        throw new Error('image static property must be overrided');
    }

    constructor()
    {
        if (this.constructor == Component)
            throw new Error('Component class can not be instantiated');
        
        var count = Component._count.get(this.constructor.name);
        this._id = count ? ++count : 1;
        Component._count.set(this.constructor.name, this._id);
        
        this.inputs = new Map();
        this.outputs = new Map();
    }

    get id()
    {
        return this._id;
    }

    get type()
    {
        return this.constructor.name;
    }

    getInput(id)
    {
        return this.inputs.get(id);
    }

    getOutput(id)
    {
        return this.outputs.get(id);
    }

    inputList()
    {
        return this.inputs.keys();
    }

    outputList()
    {
        return this.outputs.keys();
    }
}

module.exports = Component;