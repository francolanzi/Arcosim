const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MicroSequenceLogic';
const image = 'img/cpnt/MicroSequenceLogic.png';

class MicroSequenceLogicInstance extends CpntInstance
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

class MicroSequenceLogicOriginal extends CpntOriginal
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
        return MicroSequenceLogicInstance;
    }
}

module.exports = MicroSequenceLogicOriginal;