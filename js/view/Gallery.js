const fs = require('fs');
const path = require('path');

class Gallery extends HTMLElement
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

        this.style.float = 'left';
        this.style.borderWidth = '1px';
        this.style.borderStyle = 'solid';
        this.style.borderColor = '#6c757d';
        this.style.borderRadius = '0.5rem';
        this.style.marginTop = '0.5rem';
        this.style.padding = '0.5rem';
        this.style.transform = 'scaleY(0)';
        this.style.transformOrigin = 'top';
        this.style.transitionProperty = 'transform';
        this.style.transitionDuration = '0.15s';
        this.style.transitionTimingFunction = 'linear';
        this.style.backgroundColor = 'rgba(226, 227, 229, 0.85)';
        this.style.position = 'relative';
        this.style.zIndex = 1;
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.alignItems = 'center';

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
            
                this.appendChild(cpnt);
            }
        });
    }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;