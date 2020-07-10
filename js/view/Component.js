class Component
{
    static _count = new Map();

    static get type()
    {
        return this.name;
    }

    static get image()
    {
        throw new Error('image static property must be overrided');
    }

    constructor()
    {
        throw new Error('Component class can not be instantiated');
    }
}

module.exports = Component;