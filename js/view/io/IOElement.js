const StyledElement = require('../StyledElement');

class IOElement extends StyledElement
{
    get show()
    {
        return this.style.visibility == 'visible';
    }

    set show(show)
    {
        this.style.visibility = show ? 'visible' : 'hidden';
    }

    constructor(id, x, y)
    {
        super();

        this._id = id;

        this.addStyles('css/io/IOElement.css');

        this.style.top = y - 4.5;
        this.style.left = x - 4.5;
        this.style.visibility = 'hidden';

        this.classList.add('fas');
        this.classList.add('fa-circle');
    }
}

module.exports = IOElement;