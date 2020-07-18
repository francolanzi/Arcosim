class MenuItem extends HTMLElement
{
    static get title()
    {
        throw new Error('title static property must be overrided');
    }

    static get icon()
    {
        throw new Error('icon static property must be overrided');
    }

    get anchor()
    {
        return this._anchor;
    }

    constructor()
    {
        super();

        if (this.constructor == MenuItem)
            throw new Error('MenuItem class can not be instantiated');

        this.setAttribute('data-toggle', 'tooltip');
        this.setAttribute('data-placement', 'bottom');
        this.setAttribute('title', this.constructor.title);

        this._anchor = this.appendChild(document.createElement('a'));

        this._anchor.href = 'javascript:void(0);';

        this._anchor.classList.add('fas');
        this._anchor.classList.add(this.constructor.icon);
        this._anchor.classList.add('text-dark');
        this._anchor.classList.add('text-decoration-none');
        this._anchor.classList.add('h2');
        this._anchor.classList.add('m-0');
        this._anchor.classList.add('mr-3');
    }
}

module.exports = MenuItem;