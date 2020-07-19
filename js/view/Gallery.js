const fs = require('fs');
const path = require('path');

const StyledElement = require('./StyledElement');

class Gallery extends StyledElement
{
    get open()
    {
        return this.style.transform === 'scaleY(1)';
    }

    set open(open)
    {
        this.style.transform = 'scaleY(' + (open ? 1 : 0) + ')';
    }

    constructor(trash)
    {
        super();

        this.addStyles('css/Gallery.css');

        this.style.transform = 'scaleY(0)';

        fs.readdirSync(__dirname + '/cpnts').forEach(file =>
        {
            file = path.parse(file);
            if (file.ext === '.js')
            {
                var ctor = require('./cpnts/' + file.name);
                var cpnt = new ctor(trash);
        
                cpnt.addEventListener('add', ev =>
                    this.dispatchEvent(new CustomEvent('add', { detail: ev.detail })));
        
                cpnt.addEventListener('remove', ev =>
                    this.dispatchEvent(new CustomEvent('remove', { detail: ev.detail })));
            
                this.shadow.appendChild(cpnt);
            }
        });
    }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;