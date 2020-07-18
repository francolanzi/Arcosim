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

        this.style.color = '#343a40';
        this.style.textDecoration = 'none';
        this.style.fontSize = '2rem';
        this.style.margin = 0;
        this.style.marginRight = '1rem';

        this.classList.add('fas');
        this.classList.add(this.constructor.icon);

        this.addEventListener('mouseenter', () => this.style.color = '#121416');
        this.addEventListener('mouseleave', () => this.style.color = '#343a40');
    }
}

module.exports = MenuItem;