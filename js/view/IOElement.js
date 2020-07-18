class IOElement extends HTMLAnchorElement
{
    get show()
    {
        return this.style.visibility == 'visible';
    }

    set show(show)
    {
        this.style.visibility = show ? 'visible' : 'hidden';
    }

    constructor(id, top, left)
    {
        super();

        this._id = id;

        this.style.visibility = 'hidden';
        this.style.position = 'absolute';
        this.style.textShadow = '0 0 2px #000';
        this.style.fontSize = 10;
        this.style.top = top;
        this.style.left = left;
        this.href = 'javascript:void(0);';

        this.classList.add('text-decoration-none');
        this.classList.add('fas');
        this.classList.add('fa-circle');
    }
}

module.exports = IOElement;