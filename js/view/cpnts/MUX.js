const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MUX';
const image = 'img/cpnt/MUX.png';

class MUXInstance extends CpntInstance
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

class MUXOriginal extends CpntOriginal
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
        return MUXInstance;
    }
}

module.exports = MUXOriginal;