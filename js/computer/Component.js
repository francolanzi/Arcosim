const Input = require('./Input');
const Output = require('./Output');

class Component
{
    static _count = new Map();

    static get type()
    {
        return this.name;
    }

    constructor()
    {
        if (this.constructor == Component)
            throw new Error('Component class can not be instantiated');
        
        const count = Component._count.get(this.constructor.name);
        this._id = count ? count + 1 : 1;
        Component._count.set(this.constructor.name, this._id);
        
        this._inputs = new Map();
        this._outputs = new Map();
    }

    get id()
    {
        return this._id;
    }

    get inputs()
    {
        return this._inputs.keys();
    }

    get outputs()
    {
        return this._outputs.keys();
    }

    addInput(id)
    {
        if (!this._inputs.has(id))
            this._inputs.set(id, new Input(id));
        return this.getInput(id);
    }

    addOutput(id)
    {
        if (!this._outputs.has(id))
            this._outputs.set(id, new Output(id));
        return this.getOutput(id);
    }

    getInput(id)
    {
        return this._inputs.get(id);
    }

    getOutput(id)
    {
        return this._outputs.get(id);
    }

    removeInput(id)
    {
        return this._inputs.delete(id);
    }

    removeOutput(id)
    {
        return this._outputs.delete(id);
    }
}

module.exports = Component;