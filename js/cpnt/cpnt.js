class Component
{
    constructor()
    {
        if (this.constructor == Component)
            throw new Error("Component class can't be instantiated");
    }
}

module.exports =
{
    Component: Component
};