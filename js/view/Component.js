class CpntElement extends Image
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
        
        this.id = this.constructor.type;
        this.style.margin = 0;
        this.style.padding = 0;
        this.src = this.constructor.image;
        this.style.userSelect = 'none';
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

    set cpnt(_cpnt)
    {
        this._cpnt = _cpnt;
    }

    constructor(rect, trash)
    {
        super();

        if (this.constructor == CpntInstance)
            throw new Error('CpntInstance class can not be instantiated');
    
        this.style.position = 'absolute';
        this.style.top = rect.top;
        this.style.left = rect.left;

        this.trash = trash;

        this.mouse = {};
        this.mouse.x = null;
        this.mouse.y = null;

        this.mousedown = this.drag.bind(this);
        this.mousemove = this.move.bind(this);
        this.mouseup = this.drop.bind(this);
    
        this.addEventListener('mousedown', this.mousedown);
    }

    drag(ev)
    {
        var rect = this.getBoundingClientRect();

        this.mouse.x = ev.clientX - rect.left;
        this.mouse.y = ev.clientY - rect.top;

        document.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
    }

    move(ev)
    {
        this.style.top = ev.clientY - this.mouse.y;
        this.style.left = ev.clientX - this.mouse.x;

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

        if (this.trashed(ev))
        {
            this.remove();
            this.dispatchEvent(new Event('remove'));
        }
    }

    trashed(ev)
    {
        var rect = trash.getBoundingClientRect();
        
        return ev.clientY >= rect.top
            && ev.clientX >= rect.left
            && ev.clientY <= rect.bottom
            && ev.clientX <= rect.right;
    }
}

module.exports =
{
    CpntOriginal: CpntOriginal,
    CpntInstance: CpntInstance
};