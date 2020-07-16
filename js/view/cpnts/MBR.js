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

module.exports = MBROriginal;