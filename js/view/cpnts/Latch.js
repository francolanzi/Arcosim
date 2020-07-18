const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Latch';
const image = 'img/cpnt/Latch.png';

class LatchInstance extends CpntInstance
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
        
        this.addInput('Input', 31.5, 0);
        this.addInput('Clock', 63, 9.5);

        this.addOutput('Output', 31.5, 19);
    }
}

class LatchOriginal extends CpntOriginal
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
        return LatchInstance;
    }
}

customElements.define('latch-instance', LatchInstance);
customElements.define('latch-original', LatchOriginal);

module.exports = LatchOriginal;