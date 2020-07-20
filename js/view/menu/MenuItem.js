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
        
        var img = new Image();
        img.src = this.constructor.icon;

        this.shadow.appendChild(img);
    }
}

module.exports = MenuItem;