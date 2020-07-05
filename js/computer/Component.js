class Component
{
    static get image()
    {
        throw new Error('image static property must be overrided');
    }

    constructor()
    {
        if (this.constructor == Component)
            throw new Error('Component class can not be instantiated');
        
        this.inputs = new Map();
        this.outputs = new Map();
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