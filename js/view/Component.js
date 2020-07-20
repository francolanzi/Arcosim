const StyledElement = require('./StyledElement');
const InputElement = require('./io/Input');
const OutputElement = require('./io/Output');

class CpntElement extends StyledElement
{
    static get type()
    {
        throw new Error('type static property must be overrided');
    }

    static get image()
    {
        throw new Error('image static property must be overrided');
    }

    constructor()
    {
        super();

        if (this.constructor == CpntElement)
            throw new Error('CpntElement class can not be instantiated');

        this.addStyles('css/Component/CpntElement.css');
        
        var img = new Image();
        img.onload = () =>
        {
            this.style.width = img.width + 'px';
            this.style.height = img.height + 'px';
        };
        img.src = this.constructor.image;

        this.style.backgroundImage = 'url(' + this.constructor.image + ')';
    }
}

class CpntOriginal extends CpntElement
{
    static get instance()
    {
        throw new Error('instance static property must be overrided');
    }

    constructor(trash)
    {
        super();
    
        if (this.constructor == CpntOriginal)
            throw new Error('CpntOriginal class can not be instantiated');

        this.addStyles('css/Component/CpntOriginal.css');
        
        this.addEventListener('mousedown', ev =>
        {
            var rect = this.getBoundingClientRect();
            var ctor = this.constructor.instance;
            var args = [rect, trash];
            var cpnt = new ctor(...args);

            this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
            cpnt.addEventListener('remove', () =>
                this.dispatchEvent(new CustomEvent('remove', { detail: cpnt })));

            cpnt.drag(ev);
        });
    }
}

class CpntInstance extends CpntElement
{
    get cpnt()
    {
        return this._cpnt;
    }

    set cpnt(cpnt)
    {
        this._cpnt = cpnt;

        this._inputs.clear();
        this._outputs.clear();
    }

    constructor(rect, trash)
    {
        super();

        if (this.constructor == CpntInstance)
            throw new Error('CpntInstance class can not be instantiated');

        this.addStyles('css/Component/CpntInstance.css');
    
        this.style.position = 'absolute';
        this.style.top = rect.top + window.scrollY + 'px';
        this.style.left = rect.left + window.scrollX + 'px';

        this._inputs = new Map();
        this._outputs = new Map();

        this.trash = trash;

        this.mouse = {};
        this.mouse.x = null;
        this.mouse.y = null;

        this.mousedown = this.drag.bind(this);
        this.mousemove = this.move.bind(this);
        this.mouseup = this.drop.bind(this);

        document.body.appendChild(this);
    
        this.addEventListener('mousedown', this.mousedown);
    }

    drag(ev)
    {
        var rect = this.getBoundingClientRect();

        this.mouse.x = ev.clientX - rect.left - window.scrollX;
        this.mouse.y = ev.clientY - rect.top - window.scrollY;

        document.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);

        this.classList.add('dragging');

        this.dispatchEvent(new Event('drag'));
    }

    move(ev)
    {
        this.style.top = (ev.clientY - this.mouse.y) + 'px';
        this.style.left = (ev.clientX - this.mouse.x) + 'px';

        if (this.trashed(ev))
            this.style.filter = 'invert(1)';
        else
            this.style.filter = 'none';
    }

    drop(ev)
    {
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);

        this.mouse.x = null;
        this.mouse.y = null;

        this.classList.remove('dragging');

        this.dispatchEvent(new Event('drop'));

        if (this.trashed(ev))
        {
            this.remove();
            this.dispatchEvent(new Event('remove'));
        }
    }

    trashed(ev)
    {
        var rect = this.trash.getBoundingClientRect();
        
        return ev.clientY >= rect.top
            && ev.clientX >= rect.left
            && ev.clientY <= rect.bottom
            && ev.clientX <= rect.right;
    }

    addInput(id, x, y)
    {
        if (!this._inputs.has(id))
        {
            var input = new InputElement(id, x, y);
            this._inputs.set(id, input);
            this.shadow.appendChild(input);
        }
        return this.getInput(id);
    }

    addOutput(id, x, y)
    {
        if (!this._outputs.has(id))
        {
            var output = new OutputElement(id, x, y);
            this._outputs.set(id, output);
            this.shadow.appendChild(output);
        }
        return this.getOutput(id);
    }

    getInput(id)
    {
        return this._inputs.get(id);
    }

    getOutput(id)
    {
        return this._outputs.get(id);
    }

    removeInput(id)
    {
        return this._inputs.delete(id);
    }

    removeOutput(id)
    {
        return this._outputs.delete(id);
    }
}

module.exports =
{
    CpntOriginal: CpntOriginal,
    CpntInstance: CpntInstance
};