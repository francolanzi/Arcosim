const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Clock';
const image = 'img/cpnt/Clock.png';

class ClockInstance extends CpntInstance
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }

    get cpnt()
    {
        return super.cpnt;
    }
    
    set cpnt(cpnt)
    {
        super.cpnt = cpnt;

        this.addOutput('Subcycle1', 0, 49.4);
        this.addOutput('Subcycle2', 0, 35.8);
        this.addOutput('Subcycle3', 0, 22.2);
        this.addOutput('Subcycle4', 0, 8.6);
    }
}

class ClockOriginal extends CpntOriginal
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }

    static get instance()
    {
        return ClockInstance;
    }
}

customElements.define('clock-instance', ClockInstance);
customElements.define('clock-original', ClockOriginal);

module.exports = ClockOriginal;