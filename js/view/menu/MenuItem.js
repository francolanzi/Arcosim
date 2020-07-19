const StyledElement = require('../StyledElement');

class MenuItem extends StyledElement
{
    static get title()
    {
        throw new Error('title static property must be overrided');
    }

    static get icon()
    {
        throw new Error('icon static property must be overrided');
    }

    constructor()
    {
        super();

        if (this.constructor == MenuItem)
            throw new Error('MenuItem class can not be instantiated');

        this.addStyles('css/menu/MenuItem.css');

        this.setAttribute('title', this.constructor.title);

        this.classList.add('fas');
        this.classList.add(this.constructor.icon);
    }
}

module.exports = MenuItem;