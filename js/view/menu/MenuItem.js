class MenuItem extends HTMLAnchorElement
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

        this.setAttribute('title', this.constructor.title);

        this.href = 'javascript:void(0);';

        this.classList.add('fas');
        this.classList.add(this.constructor.icon);
        this.classList.add('text-dark');
        this.classList.add('text-decoration-none');
        this.classList.add('h2');
        this.classList.add('m-0');
        this.classList.add('mr-3');
    }
}

module.exports = MenuItem;