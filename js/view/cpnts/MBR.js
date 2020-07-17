const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MBR';
const image = 'img/cpnt/MBR.png';

class MBRInstance extends CpntInstance
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

class MBROriginal extends CpntOriginal
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
        return MBRInstance;
    }
}

customElements.define('mbr-instance', MBRInstance);
customElements.define('mbr-original', MBROriginal);

module.exports = MBROriginal;