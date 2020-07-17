const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Shifter';
const image = 'img/cpnt/Shifter.png';

class ShifterInstance extends CpntInstance
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }
}

class ShifterOriginal extends CpntOriginal
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
        return ShifterInstance;
    }
}

customElements.define('shifter-instance', ShifterInstance);
customElements.define('shifter-original', ShifterOriginal);

module.exports = ShifterOriginal;